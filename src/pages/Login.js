import { useState } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google login success");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="shadow-lg p-6 w-80">
        <h2 className="text-xl mb-4">Login to Vastra</h2>

        <form onSubmit={login} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2"
          />

          <button className="bg-black text-white p-2">
            Login
          </button>
        </form>

        <p className="text-center my-2">OR</p>

        <button
          onClick={googleLogin}
          className="bg-red-500 text-white p-2 w-full"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}