using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VastraAPI.Data;
using VastraAPI.Models;

namespace VastraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WishlistController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // GET ALL
        // =========================
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var data = await _context.Wishlists
                .Include(w => w.Product)
                .ToListAsync();

            return Ok(data);
        }

        // =========================
        // ADD
        // =========================
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] int productId)
        {
            var exists = await _context.Wishlists
                .FirstOrDefaultAsync(w => w.ProductId == productId);

            if (exists != null)
                return BadRequest("Already added");

            var item = new Wishlist
            {
                ProductId = productId
            };

            await _context.Wishlists.AddAsync(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        // =========================
        // DELETE
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Wishlists.FindAsync(id);

            if (item == null)
                return NotFound();

            _context.Wishlists.Remove(item);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}