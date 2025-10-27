public class ProductInformationDto
{
    public string id { get; set; } = null!;
    public string product_id { get; set; } = null!;
    public List<string> publishers { get; set; } = new List<string>();
    public int number_of_pages { get; set; }
    public string? description { get; set; }
    public string? publish_date { get; set; }
    public List<string>? isbn_13 { get; set; } = new List<string>();
    public List<string>? subjects { get; set; } = new List<string>();
}