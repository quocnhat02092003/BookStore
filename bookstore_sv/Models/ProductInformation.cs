namespace bookstore_sv.Models
{

    public class ProductInformation
    {
        public required string id { get; set; }
        public required string product_id { get; set; }
        public List<string> publishers { get; set; } = new List<string>();
        public int number_of_pages { get; set; } = 0;
        public string? description { get; set; }
        public string? publish_date { get; set; }
        public List<string>? isbn_13 { get; set; } = new List<string>();
        public List<string>? subjects { get; set; } = new List<string>();
        public Product? Product { get; set; }
    }
}
