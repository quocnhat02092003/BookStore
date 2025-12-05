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
            // Get user ID from the authenticated user's claims
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("User not authenticated");
            }

            // Fetch all carts for the authenticated user that are not checked out
            var allCarts = await _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .ThenInclude(p => p.ProductAuthors)
            .ThenInclude(pa => pa.Author)
            .Where(c => c.user_id.ToString() == userId && c.isCheckedOut == false)
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
        public async Task<IActionResult> AddToCart([FromQuery] string product_id, [FromQuery] int quantity)
        {
            // Get user ID from the authenticated user's claims
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            if (quantity < 1 || quantity > 10)
            {
                return BadRequest(new { message = "Quantity must be at least 1 and at most 10" });
            }

            // Check if the user has an existing cart that is not checked out
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.user_id.ToString() == userId && c.isCheckedOut == false);
            if (cart == null)
            {
                cart = new Cart
                {
                    id = Guid.NewGuid(),
                    user_id = Guid.Parse(userId),
                    created_at = DateTime.UtcNow,
                    updated_at = DateTime.UtcNow,
                };
                await _context.Carts.AddAsync(cart);
                await _context.SaveChangesAsync();
            }

            // Fetch the product by product_id
            var product = await _context.Products.FirstOrDefaultAsync(p => p.product_id == product_id);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            // Check if the product is already in the cart
            var cartItem = _context.CartItems.FirstOrDefault(ci => ci.product_id == product_id && ci.cart_id == cart.id);
            if (cartItem != null)
            {
                if (cartItem.quantity + quantity > 10)
                {
                    return BadRequest(new { message = "Total quantity for this product in cart cannot exceed 10" });
                }
                cartItem.quantity += quantity;
                cartItem.updated_at = DateTime.UtcNow;
            }
            else
            {
                var result = new CartItems
                {
                    id = Guid.NewGuid(),
                    product_id = product_id,
                    cart_id = cart.id,
                    quantity = quantity,
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
            // Get user ID from the authenticated user's claims
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            // Check if the user has an existing cart that is not checked out
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.user_id.ToString() == userId && c.isCheckedOut == false);
            if (cart == null)
            {
                return NotFound(new { message = "Cart not found" });
            }

            // Fetch the cart item for the specified product in the user's cart
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.product_id == product_id && ci.cart_id == cart.id);
            if (cartItem == null)
            {
                return NotFound(new { message = "Cart item not found" });
            }

            // Update the quantity of the cart item 
            cartItem.quantity = quantity;
            cartItem.updated_at = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Cart item quantity updated successfully" });
        }

        [HttpDelete("remove-item")]
        [Authorize]
        public async Task<IActionResult> RemoveItem([FromQuery] string product_id)
        {
            // Get user ID from the authenticated user's claims
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            // Check if the user has an existing cart that is not checked out
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.user_id.ToString() == userId && c.isCheckedOut == false);
            if (cart == null)
            {
                return NotFound(new { message = "Cart not found" });
            }

            // Fetch the cart item for the specified product in the user's cart
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