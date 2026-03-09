import { db } from "./firebase";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";


/* =========================
   GET ALL PRODUCTS
========================= */

export const getProducts = async () => {

  try {

    const querySnapshot = await getDocs(
      collection(db, "products")
    );

    const products = [];

    querySnapshot.forEach((doc) => {

      products.push({
        id: doc.id,
        ...doc.data()
      });

    });

    return products;

  } catch (error) {

    console.error("Error fetching products:", error);

  }

};


/* =========================
   GET SINGLE PRODUCT
========================= */

export const getProduct = async (productId) => {

  try {

    const productRef = doc(db, "products", productId);

    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {

      return {
        id: productSnap.id,
        ...productSnap.data()
      };

    }

  } catch (error) {

    console.error("Error fetching product:", error);

  }

};


/* =========================
   ADD PRODUCT (ADMIN)
========================= */

export const addProduct = async (productData) => {

  try {

    const docRef = await addDoc(
      collection(db, "products"),
      productData
    );

    return docRef.id;

  } catch (error) {

    console.error("Error adding product:", error);

  }

};


/* =========================
   UPDATE PRODUCT
========================= */

export const updateProduct = async (
  productId,
  productData
) => {

  try {

    const productRef = doc(db, "products", productId);

    await updateDoc(productRef, productData);

  } catch (error) {

    console.error("Error updating product:", error);

  }

};


/* =========================
   DELETE PRODUCT
========================= */

export const deleteProduct = async (productId) => {

  try {

    const productRef = doc(db, "products", productId);

    await deleteDoc(productRef);

  } catch (error) {

    console.error("Error deleting product:", error);

  }

};