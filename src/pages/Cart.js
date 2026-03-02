import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty 🛒</h2>
        <Link
          to="/"
          className="mt-4 inline-block bg-black text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border p-4 mb-4 rounded"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>₹{item.price}</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                updateQuantity(item.id, item.quantity - 1)
              }
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item.id, item.quantity + 1)
              }
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Total */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-bold">Total: ₹{total}</h3>

        <Link
          to="/checkout"
          className="bg-green-600 text-white px-6 py-2 rounded mt-4 inline-block"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}