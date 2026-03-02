import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 shadow">
      <h1 className="text-xl font-bold">VASTRA</h1>

      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/login">Login</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}