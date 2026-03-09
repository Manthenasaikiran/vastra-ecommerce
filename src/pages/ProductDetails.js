import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (p) => p.id === parseInt(id)
  );

  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return <p className="p-10">Product not found</p>;
  }

  const sizes = ["S", "M", "L", "XL"];

  const addToCart = () => {

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize
    );

    if (existingItem) {

      existingItem.quantity += 1;

    } else {

      cart.push({
        ...product,
        size: selectedSize,
        quantity: 1
      });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart");

    navigate("/cart");

  };

  return (

    <div className="container mx-auto p-10 grid grid-cols-2 gap-10">

      {/* PRODUCT IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full rounded"
      />

      {/* PRODUCT DETAILS */}
      <div>

        <h1 className="text-3xl font-bold">
          {product.name}
        </h1>

        <p className="text-gray-500 mt-2">
          Category: {product.category}
        </p>

        <p className="text-2xl font-bold mt-4">
          ₹{product.price}
        </p>

        <p className="text-gray-500 mt-4">
          Premium quality fashion product designed for modern style and comfort.
        </p>

        {/* SIZE SELECTION */}
        <h3 className="mt-6 font-semibold">
          Available Sizes
        </h3>

        <div className="flex gap-4 mt-3">

          {sizes.map((size) => (

            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded
              ${selectedSize === size ? "bg-black text-white" : ""}`}
            >
              {size}
            </button>

          ))}

        </div>

        {/* ADD TO CART */}
        <button
          onClick={addToCart}
          className="bg-black text-white px-6 py-3 mt-6 rounded"
        >
          Add to Cart
        </button>

      </div>

    </div>

  );

}

export default ProductDetails;