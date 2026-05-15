using System.Collections.Generic;

namespace VastraAPI.Models
{
    public class OrderDto
    {
        // 👤 Customer details
        public string CustomerName { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        // 💳 Payment method (IMPORTANT)
        public string PaymentMethod { get; set; } = "COD";

        // 📦 Order items
        public List<OrderItemDto> Items { get; set; } = new List<OrderItemDto>();
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }

        public int Quantity { get; set; }
    }
}