import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // Load cart
  useEffect(() => {

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(storedCart);

  }, []);

  // Remove item
  const removeItem = (id) => {

    const updatedCart =
      cartItems.filter(item => item.id !== id);

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // Increase quantity
  const increaseQty = (id) => {

    const updatedCart = cartItems.map(item => {

      if(item.id === id){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }

      return item;

    });

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // Decrease quantity
  const decreaseQty = (id) => {

    const updatedCart = cartItems.map(item => {

      if(item.id === id && item.quantity > 1){
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }

      return item;

    });

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // Calculate total price
  const totalPrice = cartItems.reduce(

    (total,item)=>
      total + item.price * item.quantity,

    0

  );

  return (

    <div className="container mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <div>

          <p>Your cart is empty</p>

          <button
          onClick={()=>navigate("/products")}
          className="mt-4 bg-black text-white px-4 py-2 rounded">

          Go Shopping

          </button>

        </div>

      ) : (

        <div className="flex gap-10">

          {/* Cart Items */}

          <div className="flex-1">

            {cartItems.map(item => (

              <div
              key={item.id}
              className="flex items-center border p-4 mb-4 rounded">

                <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover mr-4"
                />

                <div className="flex-1">

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p>₹{item.price}</p>

                  <div className="flex items-center gap-3 mt-2">

                    <button
                    onClick={()=>decreaseQty(item.id)}
                    className="px-3 border">
                    -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                    onClick={()=>increaseQty(item.id)}
                    className="px-3 border">
                    +
                    </button>

                  </div>

                </div>

                <button
                onClick={()=>removeItem(item.id)}
                className="text-red-500">

                Remove

                </button>

              </div>

            ))}

          </div>


          {/* Order Summary */}

          <div className="w-80 border p-6 rounded">

            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <p>Total Items: {cartItems.length}</p>

            <p className="font-bold mb-4">
              Total Price: ₹{totalPrice}
            </p>

            <button
            onClick={()=>navigate("/checkout")}
            className="bg-black text-white w-full py-3 rounded">

            Proceed to Checkout

            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Cart;