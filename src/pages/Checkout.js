import { useCart } from "../context/CartContext";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    const user = auth.currentUser;

    // 🔥 If user not logged in → redirect to login
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart,
        total,
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully 🎉");
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Order failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {cart.map((item) => (
        <div key={item.id} className="mb-2">
          {item.name} x {item.quantity}
        </div>
      ))}

      <h3 className="text-xl font-semibold mt-4">Total: ₹{total}</h3>

      <button
        onClick={handleOrder}
        className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
      >
        Place Order
      </button>
    </div>
  );
}