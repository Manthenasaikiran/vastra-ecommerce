import React from "react";

function CartItem({ item, increaseQty, decreaseQty, removeItem }) {

  return (

    <div className="flex items-center border rounded-lg p-4 mb-4">

      {/* Product Image */}

      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />


      {/* Product Details */}

      <div className="flex-1 ml-4">

        <h3 className="text-lg font-semibold">
          {item.name}
        </h3>

        <p className="text-gray-600">
          ₹{item.price}
        </p>


        {/* Quantity Controls */}

        <div className="flex items-center mt-2 gap-3">

          <button
            onClick={() => decreaseQty(item.id)}
            className="border px-3 py-1"
          >
            -
          </button>

          <span>
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQty(item.id)}
            className="border px-3 py-1"
          >
            +
          </button>

        </div>

      </div>


      {/* Remove Button */}

      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 ml-4"
      >
        Remove
      </button>

    </div>

  );

}

export default CartItem;