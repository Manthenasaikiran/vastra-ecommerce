using System.ComponentModel.DataAnnotations;

namespace VastraAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        // Use double for SQLite compatibility
        [Required]
        public double Price { get; set; }

        public string? ImageUrl { get; set; }

        [MaxLength(100)]
        public string Category { get; set; } = "Men";
    }
}