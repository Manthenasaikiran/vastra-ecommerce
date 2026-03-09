import React, { createContext, useState, useEffect } from "react";

import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { login, signup, logout, googleLogin } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);
      setLoading(false);

    });

    return unsubscribe;

  }, []);


  const handleLogin = async (email, password) => {

    const user = await login(email, password);
    setUser(user);

  };


  const handleSignup = async (email, password) => {

    const user = await signup(email, password);
    setUser(user);

  };


  const handleGoogleLogin = async () => {

    const user = await googleLogin();
    setUser(user);

  };


  const handleLogout = async () => {

    await logout();
    setUser(null);

  };


  const value = {

    user,
    login: handleLogin,
    signup: handleSignup,
    googleLogin: handleGoogleLogin,
    logout: handleLogout

  };


  return (

    <AuthContext.Provider value={value}>

      {!loading && children}

    </AuthContext.Provider>

  );

};