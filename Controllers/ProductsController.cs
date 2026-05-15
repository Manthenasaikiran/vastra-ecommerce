using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using VastraAPI.Data;
using VastraAPI.Models;

namespace VastraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // ✅ GET ALL PRODUCTS (PUBLIC)
        // =========================
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        // =========================
        // ✅ GET PRODUCT BY ID
        // =========================
        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        // =========================
        // ➕ ADD PRODUCT (NO IMAGE)
        // =========================
        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            if (product == null)
                return BadRequest();

            _context.Products.Add(product);
            _context.SaveChanges();

            return Ok(product);
        }

        // =========================
        // 🔍 SEARCH PRODUCT
        // =========================
        [AllowAnonymous]
        [HttpGet("search")]
        public IActionResult Search(string name)
        {
            var products = _context.Products
                .Where(p => p.Name.ToLower().Contains(name.ToLower()))
                .ToList();

            return Ok(products);
        }

        // =========================
        // ✏️ UPDATE PRODUCT
        // =========================
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product updated)
        {
            var product = _context.Products.Find(id);

            if (product == null)
                return NotFound();

            product.Name = updated.Name;
            product.Price = updated.Price;
            product.Category = updated.Category; // ✅ FIXED

            _context.SaveChanges();

            return Ok(product);
        }

        // =========================
        // ❌ DELETE PRODUCT (SAFE)
        // =========================
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
                return NotFound();

            // ✅ Prevent delete if used in orders
            bool isUsed = _context.OrderItems.Any(o => o.ProductId == id);

            if (isUsed)
                return BadRequest("❌ Cannot delete. Product used in orders.");

            _context.Products.Remove(product);
            _context.SaveChanges();

            return Ok("Deleted successfully");
        }

        // =========================
        // 📤 UPLOAD PRODUCT (WITH IMAGE)
        // =========================
        [HttpPost("upload")]
        public IActionResult UploadProduct([FromForm] ProductUploadDto dto)
        {
            if (dto == null)
                return BadRequest();

            string fileName = null;

            if (dto.Image != null)
            {
                var folderPath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot/images"
                );

                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);

                var filePath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    dto.Image.CopyTo(stream);
                }
            }

            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                Category = dto.Category, // ✅ IMPORTANT
                ImageUrl = fileName != null ? $"/images/{fileName}" : null // ✅ FIXED
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return Ok(product);
        }
    }
}