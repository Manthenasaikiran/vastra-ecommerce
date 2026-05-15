using Microsoft.AspNetCore.Http;

namespace VastraAPI.DTOs
{
    public class ProductUploadDto
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public IFormFile Image { get; set; }
    }
}