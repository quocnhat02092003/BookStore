using bookstore_sv.Models;

public class Cart
{
    public Guid id { get; set; }
    public required Guid user_id { get; set; }
    public DateTime created_at { get; set; } = DateTime.UtcNow;
    public DateTime updated_at { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public ICollection<CartItems> CartItems { get; set; } = new List<CartItems>();

}