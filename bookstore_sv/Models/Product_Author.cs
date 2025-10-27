using bookstore_sv.Models;

public class ProductAuthor
{
    public required string id { get; set; } = null!;
    public required string product_id { get; set; } = null!;
    public required string author_key { get; set; } = null!;
    public Product? Product { get; set; }
    public Author Author { get; set; } = null!;
}