public class ProductCountDto
{
    public string id { get; set; } = null!;
    public string product_id { get; set; } = null!;
    public int want_to_read { get; set; } = 0;
    public int currently_reading { get; set; } = 0;
    public int already_read { get; set; } = 0;
}