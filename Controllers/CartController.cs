using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VastraAPI.Data;
using VastraAPI.Models;

namespace VastraAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // ✅ GET CART
        // =========================
        [HttpGet]
        public IActionResult GetCart()
        {
            var cart = _context.CartItems
                .Include(c => c.Product)
                .Select(c => new
                {
                    c.Id,
                    c.Quantity,
                    Product = new
                    {
                        c.Product.Id,
                        c.Product.Name,
                        c.Product.Price,
                        c.Product.ImageUrl
                    }
                })
                .ToList();

            return Ok(cart);
        }

        // =========================
        // ✅ ADD TO CART (FIXED)
        // =========================
        [HttpPost]
        public IActionResult AddToCart(CartItemDto dto)
        {
            if (dto == null || dto.ProductId <= 0 || dto.Quantity <= 0)
                return BadRequest("Invalid data");

            var product = _context.Products.Find(dto.ProductId);
            if (product == null)
                return NotFound("Product not found");

            var existing = _context.CartItems
                .FirstOrDefault(x => x.ProductId == dto.ProductId);

            if (existing != null)
            {
                // 🔥 FIX: INCREMENT instead of overwrite
                existing.Quantity += dto.Quantity;
            }
            else
            {
                var cartItem = new CartItem
                {
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity
                };

                _context.CartItems.Add(cartItem);
            }

            _context.SaveChanges();
            return Ok("Cart updated");
        }

        // =========================
        // ✅ UPDATE QUANTITY (🔥 MAIN FIX)
        // =========================
        [HttpPut("{id}")]
        public IActionResult UpdateQuantity(int id, [FromBody] CartItemDto dto)
        {
            var item = _context.CartItems.FirstOrDefault(c => c.Id == id);

            if (item == null)
                return NotFound("Cart item not found");

            if (dto.Quantity < 1)
                return BadRequest("Quantity must be at least 1");

            item.Quantity = dto.Quantity;

            _context.SaveChanges();

            return Ok(item);
        }

        // =========================
        // ❌ REMOVE ITEM
        // =========================
        [HttpDelete("{id}")]
        public IActionResult RemoveItem(int id)
        {
            var item = _context.CartItems.Find(id);

            if (item == null)
                return NotFound();

            _context.CartItems.Remove(item);
            _context.SaveChanges();

            return Ok("Item removed");
        }

        // =========================
        // 🧹 CLEAR CART
        // =========================
        [HttpDelete("clear")]
        public IActionResult ClearCart()
        {
            var items = _context.CartItems.ToList();

            _context.CartItems.RemoveRange(items);
            _context.SaveChanges();

            return Ok("Cart cleared");
        }
    }
}