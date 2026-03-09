import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";


/* ======================
   SIGNUP
====================== */

export const signup = async (email, password) => {

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;

};


/* ======================
   LOGIN
====================== */

export const login = async (email, password) => {

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;

};


/* ======================
   GOOGLE LOGIN
====================== */

export const googleLogin = async () => {

  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);

  return result.user;

};


/* ======================
   LOGOUT
====================== */

export const logout = async () => {

  await signOut(auth);

};