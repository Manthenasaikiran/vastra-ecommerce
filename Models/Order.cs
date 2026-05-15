using System;
using System.Collections.Generic;

namespace VastraAPI.Models
{
    public class Order
    {
        public int Id { get; set; }

        // 👤 Customer details
        public string CustomerName { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        // 💳 Payment (IMPORTANT)
        public string PaymentMethod { get; set; } = "COD";

        public string Status { get; set; } = "Placed";

        // 💰 Total price
        public double TotalAmount { get; set; }

        // 📦 Order Items (Products inside order)
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        // 📅 Created date
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}