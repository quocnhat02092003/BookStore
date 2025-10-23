public class Author
{
    public required string author_key { get; set; }
    public string name { get; set; } = null!;
    public List<ProductAuthor>? ProductAuthors { get; set; }
}