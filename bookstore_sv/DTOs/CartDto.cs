public class CartDto
{
    public Guid id { get; set; }
    public DateTime created_at { get; set; }
    public DateTime updated_at { get; set; }
    public List<CartItemDto> CartItems { get; set; } = new List<CartItemDto>();
}