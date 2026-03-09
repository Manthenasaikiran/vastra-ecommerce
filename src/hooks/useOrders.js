import { useState, useEffect } from "react";

import { getUserOrders } from "../services/orderService";

const useOrders = (userId) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        if (!userId) return;

        const data = await getUserOrders(userId);

        setOrders(data || []);

      } catch (error) {

        console.error("Error loading orders:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, [userId]);


  return {

    orders,
    loading

  };

};

export default useOrders;