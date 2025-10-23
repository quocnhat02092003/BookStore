namespace bookstore_sv.Models;

public class ProductSummary
{
    public required string id { get; set; }
    public required string product_id { get; set; }
    public float? average { get; set; }
    public int? count { get; set; }
    public float? sortable { get; set; }
    public Product? Product { get; set; }
}