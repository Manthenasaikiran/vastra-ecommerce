namespace VastraAPI.Models
{
    public class Wishlist
    {
        public int Id { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}