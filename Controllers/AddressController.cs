using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VastraAPI.Data;
using VastraAPI.Models;

namespace VastraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AddressController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // GET ALL ADDRESSES
        // =========================
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Addresses.ToList());
        }

        // =========================
        // ADD ADDRESS
        // =========================
        [HttpPost]
        public async Task<IActionResult> Add(Address addr)
        {
            await _context.Addresses.AddAsync(addr);
            await _context.SaveChangesAsync();
            return Ok(addr);
        }

        // =========================
        // DELETE ADDRESS
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var addr = await _context.Addresses.FindAsync(id);
            if (addr == null) return NotFound();

            _context.Addresses.Remove(addr);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}