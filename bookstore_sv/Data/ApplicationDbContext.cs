using bookstore_sv.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Token> Tokens { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductInformation> ProductInformations { get; set; }
    public DbSet<ProductSummary> ProductSummaries { get; set; }
    public DbSet<ProductCount> ProductCounts { get; set; }
    public DbSet<Author> Authors { get; set; }
    public DbSet<ProductAuthor> ProductAuthors { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Key user
        modelBuilder.Entity<User>()
        .HasKey(u => u.Id);

        //Relation user-token
        modelBuilder.Entity<Token>()
        .HasOne(rt => rt.User)
        .WithMany(u => u.Tokens)
        .HasForeignKey(rt => rt.UserId)
        .OnDelete(DeleteBehavior.Cascade);

        //Key product
        modelBuilder.Entity<Product>()
        .HasKey(p => p.product_id);

        //Key product information
        modelBuilder.Entity<ProductInformation>()
        .HasKey(pi => pi.id);

        //Relation product - product information
        modelBuilder.Entity<Product>()
        .HasOne(p => p.ProductInformation)
        .WithOne(pi => pi.Product)
        .HasForeignKey<ProductInformation>(pi => pi.product_id)
        .OnDelete(DeleteBehavior.Cascade);

        //Key product summary
        modelBuilder.Entity<ProductSummary>()
        .HasKey(ps => ps.id);

        //Relation product - product summary
        modelBuilder.Entity<Product>()
        .HasOne(p => p.ProductSummary)
        .WithOne(ps => ps.Product)
        .HasForeignKey<ProductSummary>(ps => ps.product_id)
        .OnDelete(DeleteBehavior.Cascade);

        //Key product author
        modelBuilder.Entity<ProductCount>()
        .HasKey(pc => pc.id);

        //Relation product - product count
        modelBuilder.Entity<Product>()
        .HasOne(p => p.ProductCount)
        .WithOne(pc => pc.Product)
        .HasForeignKey<ProductCount>(pc => pc.product_id)
        .OnDelete(DeleteBehavior.Cascade);

        //Key product author
        modelBuilder.Entity<ProductAuthor>()
        .HasKey(pa => new { pa.product_id, pa.author_key });

        modelBuilder.Entity<Author>()
        .HasKey(a => a.author_key);

        //Relation product - product author
        modelBuilder.Entity<ProductAuthor>()
            .HasOne(pa => pa.Product)
            .WithMany(p => p.ProductAuthors)
            .HasForeignKey(pa => pa.product_id);

        //Relation author - product author
        modelBuilder.Entity<ProductAuthor>()
            .HasOne(pa => pa.Author)
            .WithMany(a => a.ProductAuthors)
            .HasForeignKey(pa => pa.author_key);
    }
}