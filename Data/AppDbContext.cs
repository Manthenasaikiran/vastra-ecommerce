using Microsoft.EntityFrameworkCore;
using VastraAPI.Models;

namespace VastraAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // 👤 USERS
        public DbSet<User> Users { get; set; }

        // 🛍 PRODUCTS
        public DbSet<Product> Products { get; set; }

        // 🛒 CART
        public DbSet<CartItem> CartItems { get; set; }

        // 📦 ORDERS
        public DbSet<Order> Orders { get; set; }

        // 📦 ORDER ITEMS
        public DbSet<OrderItem> OrderItems { get; set; }

        public DbSet<Address> Addresses { get; set; }

        public DbSet<Wishlist> Wishlists { get; set; }

        // ⚙️ RELATIONSHIPS CONFIG
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // =========================
            // 💰 PRICE PRECISION (IMPORTANT)
            // =========================
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<OrderItem>()
                .Property(o => o.Price)
                .HasColumnType("decimal(18,2)");

            // =========================
            // 🔗 CartItem → Product
            // =========================
            modelBuilder.Entity<CartItem>()
                .HasOne(c => c.Product)
                .WithMany()
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // =========================
            // 🔗 OrderItem → Product
            // =========================
            modelBuilder.Entity<OrderItem>()
                .HasOne(o => o.Product)
                .WithMany()
                .HasForeignKey(o => o.ProductId)
                .OnDelete(DeleteBehavior.Restrict);

            // =========================
            // 🔗 OrderItem → Order
            // =========================
            modelBuilder.Entity<OrderItem>()
                .HasOne(o => o.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(o => o.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}