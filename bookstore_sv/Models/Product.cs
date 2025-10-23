namespace bookstore_sv.Models
{
    public class Product
    {
        public string type { get; set; } = null!;
        public required string product_id { get; set; }
        public int cover { get; set; } = 0;
        public List<string> author_key { get; set; } = new List<string>();
        public string title { get; set; } = null!;
        public int first_publish_year { get; set; } = 0;
        public string cover_edition_key { get; set; } = null!;
        public int price { get; set; } = 0;
        public string category { get; set; } = null!;
        public int quantity_in_stock { get; set; } = 0;
        public ProductInformation? ProductInformation { get; set; }
        public ProductSummary? ProductSummary { get; set; }
        public ProductCount? ProductCount { get; set; }
        public List<ProductAuthor>? ProductAuthors { get; set; } = new List<ProductAuthor>();
    }
}
