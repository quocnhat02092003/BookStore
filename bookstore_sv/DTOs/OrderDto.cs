using bookstore_sv.Models;

public class OrderDto
{
    public Guid order_id { get; set; }
    public Guid user_id { get; set; }
    public int total_price { get; set; }
    public string status { get; set; } = "Pending";
    public string payment_method { get; set; } = "";
    public DateTime created_at { get; set; } = DateTime.UtcNow;
    public DateTime updated_at { get; set; } = DateTime.UtcNow;
    public ICollection<OrderItemDto> OrderItems { get; set; } = new List<OrderItemDto>();
}