using System.Security.Claims;
using bookstore_sv.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bookstore_sv.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("all-cart")]
        [Authorize]
        public async Task<IActionResult> GetAllCart()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User not authenticated");
            }

            var allCarts = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .ThenInclude(p => p.ProductAuthors)
            .ThenInclude(pa => pa.Author)
            .Where(c => c.user_id.ToString() == userId)
            .Select(c => new CartDto
            {
                id = c.id,
                created_at = c.created_at,
                updated_at = c.updated_at,
                CartItems = c.CartItems.Select(ci => new CartItemDto
                {
                    id = ci.id,
                    product_id = ci.product_id,
                    cart_id = ci.cart_id,
                    quantity = ci.quantity,
                    Product = new ProductDto
                    {
                        product_id = ci.Product.product_id,
                        type = ci.Product.type,
                        title = ci.Product.title,
                        cover = ci.Product.cover,
                        price = ci.Product.price,
                        category = ci.Product.category,
                        quantity_in_stock = ci.Product.quantity_in_stock,
                        Authors = ci.Product.ProductAuthors.Select(pa => new AuthorDto
                        {
                            author_key = pa.Author.author_key,
                            name = pa.Author.name
                        }).ToList()
                    }
                }).ToList()
            }).FirstOrDefaultAsync();

            if (allCarts == null)
            {
                return Ok(new { data = new CartDto(), status = 200, message = "Success" });
            }

            return Ok(new { data = allCarts, status = 200, message = "Success" });
        }

        [HttpPost("add-to-cart")]
        [Authorize]
        public async Task<IActionResult> AddToCart([FromQuery] string product_id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.user_id.ToString() == userId);
            if (cart == null)
            {
                cart = new Cart
                {
                    id = Guid.NewGuid(),
                    user_id = Guid.Parse(userId),
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow
                };
                await _context.Carts.AddAsync(cart);
                await _context.SaveChangesAsync();
            }

            var product = await _context.Products.FirstOrDefaultAsync(p => p.product_id == product_id);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            var cartItem = _context.CartItems.FirstOrDefault(ci => ci.product_id == product_id);
            if (cartItem != null)
            {
                cartItem.quantity += 1;
                cartItem.updated_at = DateTime.UtcNow;
            }
            else
            {
                var result = new CartItems
                {
                    id = Guid.NewGuid(),
                    product_id = product_id,
                    cart_id = cart.id,
                    quantity = 1,
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow
                };
                await _context.CartItems.AddAsync(result);
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Product added to cart successfully" });
        }

        [HttpPut("change-quantity")]
        [Authorize]
        public async Task<IActionResult> ChangeQuantity([FromQuery] string product_id, [FromQuery] int quantity)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.user_id.ToString() == userId);
            if (cart == null)
            {
                return NotFound(new { message = "Cart not found" });
            }

            var cartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.product_id == product_id && ci.cart_id == cart.id);
            if (cartItem == null)
            {
                return NotFound(new { message = "Cart item not found" });
            }

            cartItem.quantity = quantity;
            cartItem.updated_at = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Cart item quantity updated successfully" });
        }

        [HttpDelete("remove-item")]
        [Authorize]
        public async Task<IActionResult> RemoveItem([FromQuery] string product_id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.user_id.ToString() == userId);
            if (cart == null)
            {
                return NotFound(new { message = "Cart not found" });
            }

            var cartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.product_id == product_id && ci.cart_id == cart.id);
            if (cartItem == null)
            {
                return NotFound(new { message = "Cart item not found" });
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cart item removed successfully" });
        }
    }
}