using System.Security.Claims;
using System.Text.RegularExpressions;
using bookstore_sv.Models;
using bookstore_sv.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(ApplicationDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            //Check if passwords match
            if (request.Password != request.ConfirmPassword)
            {
                return BadRequest(new { message = "Passwords do not match" });
            }

            //Check password strength
            var passwordRegex = new Regex(@"^(?=.*[a-z])(?=.*\d).{8,}$");
            if (!passwordRegex.IsMatch(request.Password))
            {
                return BadRequest(new { message = "Password must contain at least one lowercase letter, one number, and be at least 8 characters long." });
            }

            //Check if email already exists
            var checkEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (checkEmail != null)
            {
                return BadRequest(new { message = "Email already exists" });
            }

            //Create new user
            // var user = new User
            // {
            //     Email = request.Email,
            //     Username = request.Email.Split('@')[0],
            //     FullName = request.Email.Split('@')[0],
            //     PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            // };
            // _context.Users.Add(user);
            // await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            //Check email already exists
            var checkEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (checkEmail == null)
            {
                return BadRequest(new { message = "Email does not exist" });
            }

            //Check password length
            if (request.Password.Length < 8)
            {
                return BadRequest(new { message = "Password must be at least 8 characters long." });
            }

            //Check password
            if (!BCrypt.Net.BCrypt.Verify(request.Password, checkEmail.PasswordHash))
            {
                return BadRequest(new { message = "Incorrect password" });
            }

            //Generate JWT token (access & refresh token)
            var accessToken = _tokenService.GenerateAccessToken(new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, checkEmail.Id.ToString()),
                new Claim(ClaimTypes.Name, checkEmail.Email),
                new Claim(ClaimTypes.Role, checkEmail.Role == UserRole.Admin ? "Admin" : "User")
            });
            var refreshToken = _tokenService.GenerateRefreshToken();

            //Add token to cookies
            Response.Cookies.Append("accessToken", accessToken, new CookieOptions
            {
                Path = "/",
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(15)
            });
            Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                Path = "/",
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            // Save refresh token to database
            checkEmail.Tokens.Add(new Token
            {
                RefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(refreshToken),
                RefreshTokenExpiration = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow,
                UserId = checkEmail.Id
            });

            await _context.SaveChangesAsync();

            return Ok(new { message = "Login successful" });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            // Get the stored refresh token from cookies
            var storedToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(storedToken))
            {
                return Unauthorized("RefreshToken doesn't exist");
            }

            // Find the token in the database
            var tokens = await _context.Tokens
                .Include(t => t.User)
                .Where(t => t.RevokedAt == null && t.RefreshTokenExpiration > DateTime.UtcNow)
                .ToListAsync();

            // Verify the token
            Token? existingToken = null;
            foreach (var token in tokens)
            {
                if (BCrypt.Net.BCrypt.Verify(storedToken, token.RefreshTokenHash))
                {
                    existingToken = token;
                    break;
                }
            }

            // If token is invalid or expired, return unauthorized
            if (existingToken == null)
            {
                return Unauthorized("Invalid refresh token");
            }

            // Generate new access token
            var user = existingToken.User;
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, user.Role == UserRole.Admin ? "Admin" : "User")
            };

            var newAccessToken = _tokenService.GenerateAccessToken(claims);

            // Generate a new refresh token and revoke the old one
            var newRefreshTokenPlain = _tokenService.GenerateRefreshToken();
            var newRefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(newRefreshTokenPlain);

            existingToken.RevokedAt = DateTime.UtcNow;

            var newToken = new Token
            {
                Id = Guid.NewGuid(),
                RefreshTokenHash = newRefreshTokenHash,
                RefreshTokenExpiration = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow,
                UserId = user.Id
            };

            _context.Tokens.Add(newToken);
            await _context.SaveChangesAsync();

            // Set the new tokens in cookies
            Response.Cookies.Append("accessToken", newAccessToken, new CookieOptions
            {
                Path = "/",
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(15)
            });

            return Ok(new { message = "Token refreshed successfully" });
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetInformationMe()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("UserID not found in token");
            }

            if (!Guid.TryParse(userId, out var userIdGuid))
            {
                return Unauthorized("Invalid UserID");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userIdGuid);
            if (user == null)
            {
                return NotFound("User not found");
            }

            return Ok(new
            {
                user.Id,
                user.Email,
                user.FullName,
                user.Username,
                message = "User information retrieved successfully"
            });
        }
    }
}

public class RegisterRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string ConfirmPassword { get; set; }
}

public class LoginRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}