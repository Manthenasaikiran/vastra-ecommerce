// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6YSewN1s0QXigLIrzAUHsw-2HyzwyiAE",
  authDomain: "vastra-d572f.firebaseapp.com",
  projectId: "vastra-d572f",
  storageBucket: "vastra-d572f.appspot.com",
  messagingSenderId: "22353321508",
  appId: "1:22353321508:web:764c23bc07ce860f8182b1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);