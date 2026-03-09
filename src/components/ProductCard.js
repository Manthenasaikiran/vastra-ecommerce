import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check wishlist when component loads
  useEffect(() => {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((item) => item.id === product.id);

    setIsWishlisted(!!exists);

  }, [product]);


  // Open product details page
  const openProduct = () => {

    navigate(`/product/${product.id}`);

  };


  // Add to cart
  const addToCart = () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (exists) {

      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );

    } else {

      updatedCart = [...cart, { ...product, quantity: 1 }];

    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Product added to cart 🛒");

  };


  // Wishlist toggle
  const toggleWishlist = () => {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isWishlisted) {

      wishlist = wishlist.filter((item) => item.id !== product.id);

      setIsWishlisted(false);

    } else {

      wishlist.push(product);

      setIsWishlisted(true);

    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

  };


  return (

    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">

      {/* Product Image */}
      <img
  loading="lazy"
  src={product.image || "/placeholder.png"}
  alt={product.name}
  onError={(e)=>{e.target.src="/placeholder.png"}}
  className="w-16 h-16 object-cover"
/>

      {/* Product Name */}
      <h3
        onClick={openProduct}
        className="text-lg font-semibold mt-3 cursor-pointer"
      >
        {product.name}
      </h3>

      {/* Category */}
      <p className="text-gray-500">
        {product.category || "Fashion"}
      </p>

      {/* Price */}
      <p className="font-bold mt-1">
        ₹{product.price}
      </p>

      <div className="flex justify-between items-center mt-4">

        <button
          onClick={addToCart}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add to Cart
        </button>

        <button
          onClick={toggleWishlist}
          className="text-2xl"
        >
          {isWishlisted ? "❤️" : "🤍"}
        </button>

      </div>

    </div>

  );

}

export default ProductCard;