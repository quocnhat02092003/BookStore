using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrderController(ApplicationDbContext context)
    {
        _context = context;
    }

    //Create Orders from Cart
    [HttpPost("create-orders")]
    [Authorize]
    public async Task<IActionResult> CreateOrders()
    {
        //Check user existence
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized("User not authenticated");
        }

        //Get cart not checked out
        var cart = await _context.Carts.Include(c => c.CartItems).ThenInclude(ci => ci.Product).FirstOrDefaultAsync(c => c.user_id.ToString() == userId && c.isCheckedOut == false);
        if (cart == null || cart.CartItems.Any() == false)
        {
            return NotFound("Cart is empty or not found");
        }

        //Mark cart as checked out
        cart.isCheckedOut = true;
        _context.Carts.Update(cart);
        await _context.SaveChangesAsync();

        //Calculate total price
        var total = cart.CartItems.Sum(ci => ci.quantity * ci.Product.price);

        //Create order and remove all before order items
        var existingOrder = await _context.Orders.FirstOrDefaultAsync(o => o.user_id.ToString() == userId && o.status == "Pending");
        if (existingOrder != null)
        {
            _context.Orders.Remove(existingOrder);
            await _context.SaveChangesAsync();
        }

        var order = new Order
        {
            user_id = Guid.Parse(userId),
            order_id = Guid.NewGuid(),
            total_price = total,
            status = "Pending",
            created_at = DateTime.UtcNow,
            updated_at = DateTime.UtcNow
        };
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        //Copy cart items to order items
        foreach (var item in cart.CartItems)
        {
            var orderItem = new OrderItem
            {
                id = Guid.NewGuid(),
                order_id = order.order_id,
                product_id = item.product_id,
                quantity = item.quantity,
                price = item.Product.price
            };
            _context.OrderItems.Add(orderItem);
        }
        await _context.SaveChangesAsync();

        return Ok(new { message = "Order created successfully" });
    }

    [HttpGet("all-orders")]
    [Authorize]
    public async Task<IActionResult> GetAllOrders()
    {
        //Check user existence
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized("User not authenticated");
        }

        //Get all orders for user
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .Where(o => o.user_id == Guid.Parse(userId) && o.status == "Pending")
            .Select(o => new OrderDto
            {
                order_id = o.order_id,
                user_id = o.user_id,
                total_price = o.total_price,
                status = o.status,
                payment_method = o.payment_method,
                created_at = o.created_at,
                updated_at = o.updated_at,
                OrderItems = o.OrderItems.Select(oi => new OrderItemDto
                {
                    id = oi.id,
                    order_id = oi.order_id,
                    product_id = oi.product_id,
                    quantity = oi.quantity,
                    price = oi.price,
                    Product = new ProductDto
                    {
                        product_id = oi.Product.product_id,
                        type = oi.Product.type,
                        title = oi.Product.title,
                        cover = oi.Product.cover,
                        price = oi.Product.price,
                        category = oi.Product.category,
                        quantity_in_stock = oi.Product.quantity_in_stock
                    }
                }).ToList()
            }).ToListAsync();

        return Ok(new { data = orders, message = "Orders retrieved successfully", status = 200 });
    }

}