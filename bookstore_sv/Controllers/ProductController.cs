using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public ProductController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("all-products")]
    public async Task<IActionResult> GetAllProducts([FromQuery] int page, [FromQuery] int pageSize)
    {
        if (page <= 0) page = 1;
        if (pageSize <= 0) pageSize = 12;

        // Calculate total pages
        var countsProducts = await _context.Products.CountAsync();
        int totalPages = countsProducts / pageSize;
        if (countsProducts % pageSize != 0) totalPages += 1;

        // Fetch paginated products with authors
        var products = await _context.Products.Skip((page - 1) * pageSize).Take(pageSize).Select(p => new ProductDto
        {
            product_id = p.product_id,
            type = p.type,
            title = p.title,
            cover = p.cover,
            author_key = p.author_key,
            first_publish_year = p.first_publish_year,
            cover_edition_key = p.cover_edition_key,
            price = p.price,
            category = p.category,
            quantity_in_stock = p.quantity_in_stock,
            Authors = p.ProductAuthors.Select(pa => new AuthorDto
            {
                author_key = pa.Author.author_key,
                name = pa.Author.name
            }).ToList()
        })
        .ToListAsync();

        return Ok(new { data = products, counts = countsProducts, status = 200, message = "Success", totalPages = totalPages });
    }

    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetProductsByCategory(string category)
    {

        // Calculate total pages
        var countsProducts = await _context.Products.CountAsync(p => p.category == category);
        int totalPages = countsProducts / 12;
        if (countsProducts % 12 != 0) totalPages += 1;

        // Fetch products by category with authors 
        var products = await _context.Products
        .Where(p => p.category == category)
        .Include(p => p.ProductAuthors)
        .ThenInclude(pa => pa.Author)
        .Take(10)
        .Select(p => new ProductDto
        {
            product_id = p.product_id,
            type = p.type,
            title = p.title,
            cover = p.cover,
            author_key = p.author_key,
            first_publish_year = p.first_publish_year,
            cover_edition_key = p.cover_edition_key,
            price = p.price,
            category = p.category,
            quantity_in_stock = p.quantity_in_stock,
            Authors = p.ProductAuthors.Select(pa => new AuthorDto
            {
                author_key = pa.Author.author_key,
                name = pa.Author.name
            }).ToList()
        })
        .ToListAsync();

        return Ok(new { data = products, status = 200, message = "Success", totalPages = totalPages });
    }

    [HttpGet("product-info/{product_id}")]
    public async Task<IActionResult> GetProductInformationByProductId(string product_id)
    {
        // Fetch product information with related entities
        var product = await _context.Products
        .Include(pi => pi.ProductInformation)
        .Include(ps => ps.ProductSummary)
        .Include(pc => pc.ProductCount)
        .Include(pa => pa.ProductAuthors)
        .ThenInclude(a => a.Author)
        .FirstOrDefaultAsync(p => p.product_id == product_id);

        if (product == null)
        {
            return NotFound();
        }

        // Map product to ProductDto
        var result = new ProductDto
        {
            product_id = product.product_id,
            type = product.type,
            title = product.title,
            cover = product.cover,
            author_key = product.author_key,
            first_publish_year = product.first_publish_year,
            cover_edition_key = product.cover_edition_key,
            price = product.price,
            category = product.category,
            quantity_in_stock = product.quantity_in_stock,
            Authors = product.ProductAuthors.Select(pa => new AuthorDto
            {
                author_key = pa.Author.author_key,
                name = pa.Author.name
            }).ToList(),
            ProductInformation = new ProductInformationDto
            {
                id = product.ProductInformation.id,
                product_id = product.ProductInformation.product_id,
                publishers = product.ProductInformation.publishers,
                number_of_pages = product.ProductInformation.number_of_pages,
                description = product.ProductInformation.description,
                publish_date = product.ProductInformation.publish_date,
                isbn_13 = product.ProductInformation.isbn_13,
                subjects = product.ProductInformation.subjects
            },
            ProductSummary = new ProductSummaryDto
            {
                id = product.ProductSummary.id,
                product_id = product.ProductSummary.product_id,
                average = ((double?)product.ProductSummary.average) ?? 0,
                count = product.ProductSummary.count ?? 0,
                sortable = ((int?)product.ProductSummary.sortable) ?? 0
            },
            ProductCount = new ProductCountDto
            {
                id = product.ProductCount.id,
                product_id = product.ProductCount.product_id,
                want_to_read = product.ProductCount.want_to_read,
                currently_reading = product.ProductCount.currently_reading,
                already_read = product.ProductCount.already_read
            }
        };
        return Ok(new { data = result, status = 200, message = "Success" });
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchProducts([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest(new { status = 400, message = "Query parameter is required." });
        }

        var products = await _context.Products
            .Where(p => p.title.Contains(query) || p.ProductAuthors.Any(pa => pa.Author.name.Contains(query)))
            .Select(p => new ProductDto
            {
                product_id = p.product_id,
                type = p.type,
                title = p.title,
                cover = p.cover,
                author_key = p.author_key,
                first_publish_year = p.first_publish_year,
                cover_edition_key = p.cover_edition_key,
                price = p.price,
                category = p.category,
                quantity_in_stock = p.quantity_in_stock,
                Authors = p.ProductAuthors.Select(pa => new AuthorDto
                {
                    author_key = pa.Author.author_key,
                    name = pa.Author.name
                }).ToList()
            })
            .ToListAsync();

        return Ok(new { data = products, status = 200, message = "Success" });
    }
}