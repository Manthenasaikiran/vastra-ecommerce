import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <h2 className="text-center mt-5">Loading orders...</h2>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>Order ID: {order.id}</h5>
              <p>
                <strong>Total:</strong> ₹{order.amount}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : "N/A"}
              </p>

              <h6>Items:</h6>
              <ul>
                {order.items?.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} — ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}