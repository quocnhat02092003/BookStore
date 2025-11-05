using bookstore_sv.Models;

public class OrderItem
{
    public Guid id { get; set; }
    public required Guid order_id { get; set; }
    public required string product_id { get; set; }
    public int quantity { get; set; }
    public int price { get; set; }

    public Order Order { get; set; } = null!;
    public Product Product { get; set; } = null!;
}