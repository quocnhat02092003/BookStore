public class OrderItemDto
{
    public Guid id { get; set; }
    public required Guid order_id { get; set; }
    public required string product_id { get; set; }
    public int quantity { get; set; }
    public int price { get; set; }
    public OrderDto Order { get; set; } = null!;
    public ProductDto Product { get; set; } = null!;
}