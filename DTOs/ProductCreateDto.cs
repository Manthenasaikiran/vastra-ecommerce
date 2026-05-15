using System.ComponentModel.DataAnnotations;

namespace VastraAPI.DTOs
{
    public class ProductCreateDto
    {
        [Required]
        [MinLength(2)]
        public string Name { get; set; } = string.Empty;

        [Range(1, 100000)]
        public decimal Price { get; set; }
    }
}