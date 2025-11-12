using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe.Checkout;

[ApiController]
[Route("api/[controller]")]
public class CheckoutStripeController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    public CheckoutStripeController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("create-checkout-session")]
    [Authorize]
    public async Task<IActionResult> CreateCheckoutSession()
    {
        //Get user id from token
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized("User not unauthorized");
        }

        //Get pending order from user
        var getOrderFromUser = await _context.Orders
            .Include(o => o.OrderItems).ThenInclude(od => od.Product)
            .Where(o => o.user_id.ToString() == userId && o.status == "Pending").FirstOrDefaultAsync();

        if (getOrderFromUser == null)
        {
            return BadRequest("No pending order found for user.");
        }

        //Create line items for Stripe checkout session
        var lineItems = getOrderFromUser.OrderItems.Select(item => new SessionLineItemOptions
        {
            PriceData = new SessionLineItemPriceDataOptions
            {
                UnitAmount = item.Product.price * 100,
                Currency = "usd",
                ProductData = new SessionLineItemPriceDataProductDataOptions
                {
                    Name = item.Product.title,
                    Images = new List<string> { $"https://covers.openlibrary.org/b/id/{item.Product.cover}-L.jpg" }
                },
            },
            Quantity = item.quantity,
        }).ToList();

        //Create Stripe checkout session
        var domain = _configuration["FrontendUrl"];
        var options = new SessionCreateOptions
        {
            UiMode = "embedded",
            LineItems = lineItems,
            Mode = "payment",
            ReturnUrl = domain + "/return?session_id={CHECKOUT_SESSION_ID}",
        };
        var service = new SessionService();
        Session session = service.Create(options);

        return Ok(new { clientSecret = session.ClientSecret });
    }

    [HttpPost("cancel-checkout")]
    [Authorize]
    public async Task<IActionResult> CancelCheckout()
    {
        //Get user id from token
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized("User not unauthorized");
        }

        //Get pending order from user
        var getOrderFromUser = await _context.Orders
            .Where(o => o.user_id.ToString() == userId && o.status == "Pending").FirstOrDefaultAsync();

        if (getOrderFromUser == null)
        {
            return BadRequest("No pending order found for user.");
        }

        getOrderFromUser.status = "Cancelled";
        _context.Orders.Update(getOrderFromUser);
        await _context.SaveChangesAsync();

        return Ok(new { status = 200, message = "Checkout cancelled and order updated successfully." });
    }
}