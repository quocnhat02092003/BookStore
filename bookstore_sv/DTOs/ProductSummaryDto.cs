public class ProductSummaryDto
{
    public string id { get; set; } = null!;
    public string product_id { get; set; } = null!;
    public double average { get; set; }
    public int count { get; set; }
    public int sortable { get; set; }
}