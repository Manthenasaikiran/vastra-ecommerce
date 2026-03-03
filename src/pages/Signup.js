// src/pages/Signup.js

import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-96 p-6 shadow-lg border rounded">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

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
          onClick={signup}
          className="w-full bg-green-600 text-white p-2"
        >
          Signup
        </button>
      </div>
    </div>
  );
}