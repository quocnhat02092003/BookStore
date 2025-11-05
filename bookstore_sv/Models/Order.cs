using bookstore_sv.Models;

public class Order
{
    public Guid order_id { get; set; }
    public required Guid user_id { get; set; }
    public int total_price { get; set; }
    public string status { get; set; } = "Pending";
    public string payment_method { get; set; } = "";
    public DateTime created_at { get; set; } = DateTime.UtcNow;
    public DateTime updated_at { get; set; } = DateTime.UtcNow;
    public User User { get; set; } = null!;
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}