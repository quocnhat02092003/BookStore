using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

[ApiController]
[Route("api/[controller]")]
public class CheckoutStripeController : ControllerBase
{
    // public CheckoutStripeController()
    // {
    // }

    [HttpPost("create-checkout-session")]
    public IActionResult CreateCheckoutSession()
    {
        var domain = "http://localhost:3000";
        var options = new SessionCreateOptions
        {
            UiMode = "embedded",
            LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = 2000,
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = "T-shirt",
                            Images = new List<string>
                            {
                                "https://ia800100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_72.zip&file=0012728401-L.jpg"
                            }
                        }
                    },
                    Quantity = 1
                }
            },
            Mode = "payment",
            ReturnUrl = domain + "/return?session_id={CHECKOUT_SESSION_ID}",
        };
        var service = new SessionService();
        Session session = service.Create(options);

        return Ok(new { clientSecret = session.ClientSecret });
    }
}