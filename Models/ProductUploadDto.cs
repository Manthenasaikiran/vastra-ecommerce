using Microsoft.AspNetCore.Http;

namespace VastraAPI.Models
{
    public class ProductUploadDto
    {
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }

        // ✅ ADD THIS (IMPORTANT FIX)
        public string Category { get; set; } = "Men";

        public IFormFile? Image { get; set; }
    }
}