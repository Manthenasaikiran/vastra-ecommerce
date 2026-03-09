import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [payment, setPayment] = useState("cod");

  useEffect(() => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  // Save Order
  const saveOrder = () => {

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      name,
      phone,
      address,
      city,
      pincode,
      payment,
      status: "Processing",
      date: new Date().toLocaleString()
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    navigate("/success");

  };


  // Razorpay Payment
  const startRazorpay = () => {

    const options = {

      key: "rzp_test_SOL0OaCIAKB4Nk", // replace with real key

      amount: totalPrice * 100,

      currency: "INR",

      name: "Vastra",

      description: "Fashion Purchase",

      handler: function (response) {

        alert("Payment Successful!");

        saveOrder();

      },

      prefill: {
        name: name,
        contact: phone
      },

      theme: {
        color: "#000000"
      }

    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  };


  // Place Order Button
  const placeOrder = () => {

    if (!name || !phone || !address || !city || !pincode) {

      alert("Please fill all address fields");

      return;

    }

    if (cartItems.length === 0) {

      alert("Cart is empty");

      return;

    }

    if (payment === "cod") {

      saveOrder();

    } else {

      startRazorpay();

    }

  };


  return (

    <div className="max-w-6xl mx-auto p-6 flex gap-10">

      {/* Address Form */}

      <div className="flex-1">

        <h2 className="text-2xl font-bold mb-4">
          Delivery Address
        </h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-3"
          placeholder="Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="City"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Pincode"
          value={pincode}
          onChange={(e)=>setPincode(e.target.value)}
        />


        {/* Payment Method */}

        <h3 className="text-xl font-semibold mt-6 mb-3">
          Payment Method
        </h3>

        <label className="block mb-2">
          <input
            type="radio"
            value="cod"
            checked={payment === "cod"}
            onChange={(e)=>setPayment(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label className="block mb-2">
          <input
            type="radio"
            value="online"
            checked={payment === "online"}
            onChange={(e)=>setPayment(e.target.value)}
          />
          UPI / Card / Net Banking
        </label>

      </div>


      {/* Order Summary */}

      <div className="w-80 border p-6 rounded">

        <h2 className="text-xl font-bold mb-4">
          Order Summary
        </h2>

        {cartItems.map((item)=>(
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-4"/>

        <h3 className="font-bold mb-4">
          Total: ₹{totalPrice}
        </h3>

        <button
          onClick={placeOrder}
          className="bg-black text-white w-full py-3 rounded hover:bg-gray-800"
        >
          Place Order
        </button>

      </div>

    </div>

  );

}

export default Checkout;