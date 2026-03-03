// src/pages/Login.js

import { useState } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email login
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (error) {
      alert(error.message);
    }
  };

  // Google login
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google login successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-96 p-6 shadow-lg border rounded">
        <h2 className="text-2xl font-bold mb-4">Login to Vastra</h2>

        <input
          className="w-full border p-2 mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white p-2 mb-3"
        >
          Login
        </button>

        <p className="text-center mb-2">OR</p>

        <button
          onClick={googleLogin}
          className="w-full bg-red-500 text-white p-2"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}