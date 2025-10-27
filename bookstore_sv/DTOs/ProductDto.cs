public class ProductDto
{
    public int counts { get; set; }
    public string product_id { get; set; } = null!;
    public string type { get; set; } = null!;
    public string title { get; set; } = null!;
    public int cover { get; set; }
    public List<string> author_key { get; set; } = new List<string>();
    public int first_publish_year { get; set; }
    public string cover_edition_key { get; set; } = null!;
    public int price { get; set; }
    public string category { get; set; } = null!;
    public int quantity_in_stock { get; set; }
    public List<AuthorDto> Authors { get; set; } = new List<AuthorDto>();
    public ProductInformationDto? ProductInformation { get; set; }
    public ProductSummaryDto? ProductSummary { get; set; }
    public ProductCountDto? ProductCount { get; set; }
}
