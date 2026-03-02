import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) return;

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
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="border p-3 mt-3">
          <p>Total: ₹{order.total}</p>
          {order.items.map((item) => (
            <div key={item.id}>
              {item.name} x {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}