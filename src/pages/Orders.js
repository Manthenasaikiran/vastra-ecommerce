import React, { useEffect, useState } from "react";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(storedOrders);

  }, []);

  // Empty orders
  if (orders.length === 0) {
    return (
      <div className="container mx-auto p-10 text-center">

        <h1 className="text-3xl font-bold mb-6">
          My Orders
        </h1>

        <p className="text-gray-500 text-lg">
          You haven't placed any orders yet.
        </p>

      </div>
    );
  }

  return (

    <div className="container mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders.map((order) => (

        <div
          key={order.id}
          className="border rounded-lg p-6 mb-8 shadow-sm bg-white"
        >

          {/* Order Info */}
          <div className="mb-4">

            <p className="text-sm text-gray-500">
              Order ID: {order.id}
            </p>

            <p className="text-sm text-gray-500">
              Date: {order.date}
            </p>

          </div>

          {/* Products */}
          {order.items.map((item) => (

            <div
              key={item.id}
              className="flex items-center border-b pb-4 mb-4"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded mr-4"
              />

              <div className="flex-1">

                <h3 className="font-semibold text-lg">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>

              </div>

            </div>

          ))}

          {/* Total */}
          <div className="mb-4">

            <p className="text-lg font-bold">
              Total: ₹{order.total}
            </p>

          </div>

          {/* Order Status */}
          <div>

            <p className="font-semibold mb-2">
              Order Status
            </p>

            <div className="flex flex-wrap gap-3 text-sm">

              <span className="text-green-600 font-medium">
                ✓ Confirmed
              </span>

              <span className="text-green-600 font-medium">
                ✓ Packed
              </span>

              <span className="text-green-600 font-medium">
                ✓ Shipped
              </span>

              <span className="text-gray-400">
                Out for Delivery
              </span>

              <span className="text-gray-400">
                Delivered
              </span>

            </div>

          </div>

        </div>

      ))}

    </div>

  );

}

export default Orders;