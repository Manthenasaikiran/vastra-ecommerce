using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VastraAPI.Data;
using VastraAPI.Models;

namespace VastraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // ✅ GET ALL PRODUCTS
        // =========================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products
                .OrderByDescending(p => p.Id)
                .ToListAsync();
        }

        // =========================
        // ✅ GET PRODUCT BY ID
        // =========================
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound(new { message = "Product not found" });

            return product;
        }

        // =========================
        // ✅ ADD PRODUCT
        // =========================
        [HttpPost]
        public async Task<IActionResult> AddProduct(Product product)
        {
            if (string.IsNullOrWhiteSpace(product.Name))
                return BadRequest(new { message = "Product name is required" });

            if (product.Price <= 0)
                return BadRequest(new { message = "Price must be greater than 0" });

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Product added successfully",
                product
            });
        }

        // =========================
        // ✅ UPDATE PRODUCT
        // =========================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product updatedProduct)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound(new { message = "Product not found" });

            if (string.IsNullOrWhiteSpace(updatedProduct.Name))
                return BadRequest(new { message = "Product name is required" });

            if (updatedProduct.Price <= 0)
                return BadRequest(new { message = "Price must be greater than 0" });

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price; // ✅ double
            product.ImageUrl = updatedProduct.ImageUrl;
            product.Category = updatedProduct.Category;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Product updated successfully",
                product
            });
        }

        // =========================
        // ✅ DELETE PRODUCT
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound(new { message = "Product not found" });

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Product deleted successfully" });
        }
    }
}