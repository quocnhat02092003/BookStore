using bookstore_sv.Models;

public class CartItems
{
    public Guid id { get; set; }
    public Guid cart_id { get; set; }
    public required string product_id { get; set; }
    public int quantity { get; set; }
    public DateTime created_at { get; set; } = DateTime.UtcNow;
    public DateTime updated_at { get; set; } = DateTime.UtcNow;
    public Cart Cart { get; set; } = null!;
    public Product Product { get; set; } = null!;
}