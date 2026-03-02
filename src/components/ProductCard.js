import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-black text-white px-4 py-2 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}