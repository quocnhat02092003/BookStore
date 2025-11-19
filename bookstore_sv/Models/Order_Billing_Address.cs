using bookstore_sv.Models;
namespace bookstore_sv.Models;

public class Order_Billing_Address
{
    public Guid id { get; set; }
    public Guid order_id { get; set; }
    public string email { get; set; } = null!;
    public string name { get; set; } = null!;
    public string street_address { get; set; } = null!;
    public string city { get; set; } = null!;
    public string state { get; set; } = null!;
    public string zip_code { get; set; } = null!;
    public string country { get; set; } = null!;
    public DateTime created_at { get; set; } = DateTime.UtcNow;
    public DateTime updated_at { get; set; } = DateTime.UtcNow;
    public Order? Order { get; set; }
}