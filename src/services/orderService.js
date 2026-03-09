import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc
} from "firebase/firestore";


/* =========================
   CREATE ORDER
========================= */

export const createOrder = async (orderData) => {

  try {

    const docRef = await addDoc(
      collection(db, "orders"),
      orderData
    );

    return docRef.id;

  } catch (error) {

    console.error("Error creating order:", error);

  }

};


/* =========================
   GET USER ORDERS
========================= */

export const getUserOrders = async (userId) => {

  try {

    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    const orders = [];

    querySnapshot.forEach((doc) => {

      orders.push({
        id: doc.id,
        ...doc.data()
      });

    });

    return orders;

  } catch (error) {

    console.error("Error fetching orders:", error);

  }

};


/* =========================
   GET ALL ORDERS (ADMIN)
========================= */

export const getAllOrders = async () => {

  try {

    const querySnapshot = await getDocs(
      collection(db, "orders")
    );

    const orders = [];

    querySnapshot.forEach((doc) => {

      orders.push({
        id: doc.id,
        ...doc.data()
      });

    });

    return orders;

  } catch (error) {

    console.error("Error fetching all orders:", error);

  }

};


/* =========================
   UPDATE ORDER STATUS
========================= */

export const updateOrderStatus = async (orderId, status) => {

  try {

    const orderRef = doc(db, "orders", orderId);

    await updateDoc(orderRef, {
      status: status
    });

  } catch (error) {

    console.error("Error updating order:", error);

  }

};