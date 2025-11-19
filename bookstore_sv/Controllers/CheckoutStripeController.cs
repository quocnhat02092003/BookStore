using System.Security.Claims;
using bookstore_sv.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe.Checkout;
using Stripe.V2;

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

    [HttpPost("save-address-billing-checkout")]
    [Authorize]
    public async Task<IActionResult> SaveBillingAddressCheckout([FromBody] Order_Billing_Address_Request billingAddress)
    {
        //Get user id from token
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized("User not authorized");
        }

        var orderID = _context.Orders
            .Where(o => o.user_id.ToString() == userId && o.status == "Pending")
            .Select(o => o.order_id)
            .FirstOrDefault();
        if (orderID == Guid.Empty)
        {
            return BadRequest("No pending order found for user.");
        }

        var billing_address = new Order_Billing_Address
        {
            id = Guid.NewGuid(),
            order_id = orderID,
            email = billingAddress.email,
            name = billingAddress.name,
            street_address = billingAddress.streetAddress,
            city = billingAddress.city,
            state = billingAddress.state,
            zip_code = billingAddress.zipCode,
            country = billingAddress.country
        };
        _context.Order_Billing_Addresses.Add(billing_address);
        await _context.SaveChangesAsync();

        return Ok(new { status = 200, message = "Address saved successfully." });
    }

    [HttpPost("save-address-shipping-checkout")]
    [Authorize]
    public async Task<IActionResult> SaveShippingAddressCheckout([FromBody] Order_Shipping_Address_Request shippingAddress)
    {
        //Get user id from token
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized("User not authorized");
        }

        var orderID = _context.Orders
            .Where(o => o.user_id.ToString() == userId && o.status == "Pending")
            .Select(o => o.order_id)
            .FirstOrDefault();

        if (orderID == Guid.Empty)
        {
            return BadRequest("No pending order found for user.");
        }

        var shipping_address = new Order_Shipping_Address
        {
            id = Guid.NewGuid(),
            order_id = orderID,
            full_name = shippingAddress.fullName,
            street_address = shippingAddress.streetAddress,
            city = shippingAddress.city,
            state = shippingAddress.state,
            zip_code = shippingAddress.zipCode,
            country = shippingAddress.country
        };
        _context.Order_Shipping_Addresses.Add(shipping_address);
        await _context.SaveChangesAsync();

        return Ok(new { status = 200, message = "Address saved successfully." });
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
            ClientReferenceId = getOrderFromUser.order_id.ToString(),
        };
        var service = new SessionService();
        Session session = service.Create(options);

        return Ok(new { clientSecret = session.ClientSecret });
    }

    [HttpGet("verify-payment-checkout")]
    [Authorize]
    public async Task<IActionResult> VerifyPayment([FromQuery] string session_id)
    {
        Console.WriteLine("Verifying payment for session ID: " + session_id);
        var service = new SessionService();
        var session = await service.GetAsync(session_id);

        if (session.PaymentStatus == "paid")
        {
            var orderId = session.ClientReferenceId;
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.order_id.ToString() == orderId);

            if (order != null && order.status != "Paid")
            {
                order.status = "Paid";
                order.updated_at = DateTime.UtcNow;
                await _context.SaveChangesAsync();
            }

            return Ok(new { status = 200, message = "Payment verified successfully." });
        }

        return Ok(new { status = 400, message = "Payment verification failed." });
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

public class Order_Shipping_Address_Request
{
    public Guid order_id { get; set; }
    public string fullName { get; set; } = null!;
    public string streetAddress { get; set; } = null!;
    public string city { get; set; } = null!;
    public string state { get; set; } = null!;
    public string zipCode { get; set; } = null!;
    public string country { get; set; } = null!;
}

public class Order_Billing_Address_Request
{
    public Guid order_id { get; set; }
    public string email { get; set; } = null!;
    public string name { get; set; } = null!;
    public string streetAddress { get; set; } = null!;
    public string city { get; set; } = null!;
    public string state { get; set; } = null!;
    public string zipCode { get; set; } = null!;
    public string country { get; set; } = null!;
}