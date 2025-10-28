using bookstore_sv.Models;

public class CartItemDto
{
    public Guid id { get; set; }
    public string product_id { get; set; } = null!;
    public Guid cart_id { get; set; }
    public int quantity { get; set; }
    public ProductDto? Product { get; set; }
}