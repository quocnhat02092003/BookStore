public class OrderItemDto
{
    public Guid id { get; set; }
    public Guid order_id { get; set; }
    public string product_id { get; set; } = null!;
    public int quantity { get; set; }
    public int price { get; set; }
    public OrderDto Order { get; set; } = null!;
    public ProductDto Product { get; set; } = null!;
}