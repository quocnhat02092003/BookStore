using bookstore_sv.Models;

public class ProductCount
{
    public required string id { get; set; } = null!;
    public required string product_id { get; set; } = null!;
    public int want_to_read { get; set; } = 0;
    public int currently_reading { get; set; } = 0;
    public int already_read { get; set; } = 0;
    public required Product Product { get; set; }
}