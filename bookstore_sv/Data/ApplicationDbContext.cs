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
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItems> CartItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }


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

        modelBuilder.Entity<Author>()
        .HasKey(a => a.author_key);

        modelBuilder.Entity<ProductAuthor>(entity =>
        {
            entity.HasKey(pa => new { pa.product_id, pa.author_key });

            entity.HasOne(pa => pa.Product)
            .WithMany(p => p.ProductAuthors)
            .HasForeignKey(pa => pa.product_id);

            entity.HasOne(pa => pa.Author)
            .WithMany(a => a.ProductAuthors)
            .HasForeignKey(pa => pa.author_key);
        });

        //Key cart and relations
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(c => c.id);

            entity.HasOne(c => c.User)
            .WithMany(u => u.Carts)
            .HasForeignKey(c => c.user_id)
            .OnDelete(DeleteBehavior.Cascade);
        });

        //Key cart items and relations
        modelBuilder.Entity<CartItems>(entity =>
        {
            entity.HasKey(ci => ci.id);

            entity.HasOne(ci => ci.Cart)
            .WithMany(c => c.CartItems)
            .HasForeignKey(ci => ci.cart_id)
            .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(ci => ci.Product)
            .WithMany(p => p.CartItems)
            .HasForeignKey(ci => ci.product_id)
            .OnDelete(DeleteBehavior.Cascade);
        });

        //Key order and relations
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(o => o.order_id);

            entity.HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.user_id)
                .OnDelete(DeleteBehavior.Cascade);
        });

        //Key order item and relations
        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(oi => oi.id);

            entity.HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.order_id)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(oi => oi.Product)
                .WithMany(p => p.OrderItems)
                .HasForeignKey(oi => oi.product_id)
                .OnDelete(DeleteBehavior.Restrict);
        });

    }
}