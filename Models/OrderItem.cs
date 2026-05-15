using System.ComponentModel.DataAnnotations.Schema;

namespace VastraAPI.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        // 🔗 Relation to Order
        public int OrderId { get; set; }
        public Order Order { get; set; }

        // 🔗 Relation to Product
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // 📦 Quantity
        public int Quantity { get; set; }

        // 💰 Price at time of purchase
        public decimal Price { get; set; }
    }
}