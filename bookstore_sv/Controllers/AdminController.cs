using System.Security.Claims;
using bookstore_sv.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public AdminController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("all-products-no-pagination")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllProducts()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);
        if (user == null)
        {
            return Unauthorized(new { status = 401, message = "Unauthorized" });
        }

        // Fetch paginated products with authors
        var products = await _context.Products.Select(p => new ProductDto
        {
            product_id = p.product_id,
            type = p.type,
            title = p.title,
            cover = p.cover,
            author_key = p.author_key,
            first_publish_year = p.first_publish_year,
            cover_edition_key = p.cover_edition_key,
            price = p.price,
            category = p.category,
            quantity_in_stock = p.quantity_in_stock,
            Authors = p.ProductAuthors.Select(pa => new AuthorDto
            {
                author_key = pa.Author.author_key,
                name = pa.Author.name
            }).ToList()
        })
        .ToListAsync();

        return Ok(new { data = products, status = 200, message = "Success" });
    }

    [HttpGet("all-users-no-pagination")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllUsers()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);
        if (user == null || user.Role.Equals(1))
        {
            return Unauthorized(new { status = 401, message = "Unauthorized" });
        }

        // Fetch paginated products with authors
        var users = await _context.Users.Select(p => new UserDto
        {
            Id = p.Id,
            FullName = p.FullName,
            Email = p.Email,
            Role = p.Role,
            Status = p.Status
        })
        .ToListAsync();

        return Ok(new { data = users, status = 200, message = "Success" });
    }

    [HttpGet("all-orders-no-pagination")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllOrders()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);
        if (user == null)
        {
            return Unauthorized(new { status = 401, message = "Unauthorized" });
        }

        // Fetch paginated products with authors
        var orders = await _context.Orders.Include(o => o.User).Select(p => new OrderDto
        {
            order_id = p.order_id,
            user_id = p.user_id,
            payment_method = p.payment_method,
            total_price = p.total_price,
            status = p.status,
            created_at = p.created_at,
            User = new UserDto
            {
                Id = p.User.Id,
                FullName = p.User.FullName,
                Email = p.User.Email,
                Role = p.User.Role
            },
            OrderItems = p.OrderItems.Select(oi => new OrderItemDto
            {
                id = oi.id,
                order_id = oi.order_id,
                product_id = oi.product_id,
                quantity = oi.quantity,
                price = oi.price,
                Product = new ProductDto
                {
                    cover = oi.Product.cover,
                    title = oi.Product.title,
                    product_id = oi.Product.product_id,
                    price = oi.Product.price
                }
            }).ToList()
        })
        .ToListAsync();

        return Ok(new { data = orders, status = 200, message = "Success" });
    }

    [HttpGet("orders-status-chart")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetOrdersStatusChart()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);
        if (user == null)
        {
            return Unauthorized(new { status = 401, message = "Unauthorized" });
        }

        var ordersStatus = await _context.Orders
        .Where(o => o.created_at >= DateTime.Now.AddMonths(-6))
            .GroupBy(o => o.status)
            .Select(g => new
            {
                orderStatus = g.Key,
                Count = g.Count()
            })
            .ToListAsync();

        return Ok(new { data = ordersStatus, status = 200, message = "Success" });
    }

    [HttpGet("revenue-by-months-chart")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetRevenueByMonthsChart()
    {
        var revenueByMonths = await _context.Orders
            .Where(o => o.created_at >= DateTime.Now.AddMonths(-6))
            .GroupBy(o => new { o.created_at.Year, o.created_at.Month })
            .Select(g => new
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                TotalRevenue = g.Sum(o => o.total_price)
            })
            .OrderBy(g => g.Year).ThenBy(g => g.Month)
            .ToListAsync();

        return Ok(new { data = revenueByMonths, status = 200, message = "Success" });
    }

    [HttpGet("user-by-months-chart")]
    public async Task<IActionResult> GetUserByMonthsChart()
    {
        var userByMonths = await _context.Users
            .Where(u => u.CreatedAt >= DateTime.Now.AddMonths(-6))
            .GroupBy(u => new { u.CreatedAt.Year, u.CreatedAt.Month })
            .Select(g => new
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                TotalUsers = g.Count()
            })
            .OrderBy(g => g.Year).ThenBy(g => g.Month)
            .ToListAsync();

        return Ok(new { data = userByMonths, status = 200, message = "Success" });
    }

    [HttpPut("update-order-status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateOrderStatus([FromBody] UpdateOrderStatusDto updateOrderStatusDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);
        if (user == null)
        {
            return Unauthorized(new { status = 401, message = "Unauthorized" });
        }

        var order = await _context.Orders.FirstOrDefaultAsync(o => o.order_id.ToString() == updateOrderStatusDto.orderId);
        if (order == null)
        {
            return NotFound(new { status = 404, message = "Order not found" });
        }

        order.status = updateOrderStatusDto.newStatus;
        await _context.SaveChangesAsync();

        return Ok(new { status = 200, message = "Order status updated successfully" });
    }

    [HttpPut("cancel-order")]
    [Authorize]
    public async Task<IActionResult> CancelOrder([FromBody] CancelOrderDto cancelOrderDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized(new { status = 401, message = "Unauthorized" });
        }

        var order = await _context.Orders.FirstOrDefaultAsync(o => o.order_id.ToString() == cancelOrderDto.orderId && o.user_id.ToString() == userId);
        if (order == null)
        {
            return NotFound(new { status = 404, message = "Order not found" });
        }

        order.status = "Cancelled";
        await _context.SaveChangesAsync();

        return Ok(new { status = 200, message = "Order cancelled successfully" });
    }
}

public class UpdateOrderStatusDto
{
    public string orderId { get; set; } = null!;
    public string newStatus { get; set; } = null!;
}

public class CancelOrderDto
{
    public string orderId { get; set; } = null!;
}