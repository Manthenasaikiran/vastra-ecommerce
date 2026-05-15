using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Razorpay.Api;
using VastraAPI.Data;
using VastraAPI.Models;

namespace VastraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public OrdersController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // =========================
        // ✅ PLACE ORDER (COD)
        // =========================
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderDto dto)
        {
            if (dto == null || dto.Items == null || dto.Items.Count == 0)
                return BadRequest("Invalid order");

            if (dto.PaymentMethod == "ONLINE")
                return BadRequest("Use /create-payment for online payment");

            var order = new VastraAPI.Models.Order
            {
                CustomerName = dto.CustomerName,
                Address = dto.Address,
                PaymentMethod = "COD",
                CreatedAt = DateTime.Now,
                Status = "Placed", // 🔥 NEW
                OrderItems = new List<OrderItem>()
            };

            foreach (var item in dto.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);

                if (product == null)
                    return BadRequest($"Product not found: {item.ProductId}");

                order.OrderItems.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = product.Price
                });
            }

            order.TotalAmount = order.OrderItems.Sum(i => i.Price * i.Quantity);

            await _context.Orders.AddAsync(order);

            // Clear cart
            var cartItems = await _context.CartItems.ToListAsync();
            _context.CartItems.RemoveRange(cartItems);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "COD Order placed successfully",
                total = order.TotalAmount
            });
        }

        // =========================
        // ✅ CREATE RAZORPAY ORDER
        // =========================
        [HttpPost("create-payment")]
        public IActionResult CreatePayment([FromBody] OrderDto dto)
        {
            if (dto == null || dto.Items == null || dto.Items.Count == 0)
                return BadRequest("Invalid order");

            var key = _configuration["Razorpay:Key"];
            var secret = _configuration["Razorpay:Secret"];

            var client = new RazorpayClient(key, secret);

            decimal total = 0;

            foreach (var item in dto.Items)
            {
                var product = _context.Products.Find(item.ProductId);

                if (product == null)
                    return BadRequest($"Product not found: {item.ProductId}");

                total += product.Price * item.Quantity;
            }

            var options = new Dictionary<string, object>
            {
                { "amount", (int)(total * 100) },
                { "currency", "INR" },
                { "receipt", Guid.NewGuid().ToString() }
            };

            var razorpayOrder = client.Order.Create(options);

            return Ok(new
            {
                orderId = razorpayOrder["id"].ToString(),
                amount = total * 100,
                key = key
            });
        }

        // =========================
        // ✅ SAVE ORDER AFTER PAYMENT
        // =========================
        [HttpPost("verify-payment")]
        public async Task<IActionResult> VerifyPayment([FromBody] OrderDto dto)
        {
            var order = new VastraAPI.Models.Order
            {
                CustomerName = dto.CustomerName,
                Address = dto.Address,
                PaymentMethod = "ONLINE",
                CreatedAt = DateTime.Now,
                Status = "Placed", // 🔥 NEW
                OrderItems = new List<OrderItem>()
            };

            foreach (var item in dto.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);

                if (product == null)
                    return BadRequest($"Product not found: {item.ProductId}");

                order.OrderItems.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = product.Price
                });
            }

            order.TotalAmount = order.OrderItems.Sum(i => i.Price * i.Quantity);

            await _context.Orders.AddAsync(order);

            // Clear cart
            var cartItems = await _context.CartItems.ToListAsync();
            _context.CartItems.RemoveRange(cartItems);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Payment successful & order saved" });
        }

        // =========================
        // ✅ UPDATE ORDER STATUS
        // =========================
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
                return NotFound();

            order.Status = status;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Status updated" });
        }

        // =========================
        // ✅ GET ALL ORDERS
        // =========================
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(i => i.Product)
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new
                {
                    o.Id,
                    o.CustomerName,
                    o.Address,
                    o.PaymentMethod,
                    o.Status, // 🔥 NEW
                    o.CreatedAt,

                    orderItems = o.OrderItems.Select(i => new
                    {
                        i.ProductId,
                        productName = i.Product.Name,
                        i.Quantity,
                        i.Price
                    }),

                    totalAmount = o.TotalAmount
                })
                .ToListAsync();

            return Ok(orders);
        }

        // =========================
        // ✅ DELETE ORDER
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound();

            _context.OrderItems.RemoveRange(order.OrderItems);
            _context.Orders.Remove(order);

            await _context.SaveChangesAsync();

            return Ok("Order deleted");
        }
    }
}