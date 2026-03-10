import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {

  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check wishlist
  useEffect(() => {

    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((item) => item.id === product.id);

    setIsWishlisted(!!exists);

  }, [product]);


  // Open product page
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


  // Wishlist
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

    <div className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden">

      {/* Product Image */}

      <div
        className="cursor-pointer"
        onClick={openProduct}
      >

        <img
          loading="lazy"
          src={product.image || "/placeholder.png"}
          alt={product.name}
          onError={(e)=>{e.target.src="/placeholder.png"}}
          className="w-full h-56 object-cover"
        />

      </div>


      <div className="p-4">

        {/* Product Name */}

        <h3
          onClick={openProduct}
          className="text-md font-semibold cursor-pointer hover:text-pink-600"
        >
          {product.name}
        </h3>


        {/* Category */}

        <p className="text-gray-500 text-sm mt-1">

          {product.category || "Fashion"}

        </p>


        {/* Price */}

        <p className="font-bold text-lg mt-2 text-black">

          ₹{product.price}

        </p>


        {/* Buttons */}

        <div className="flex justify-between items-center mt-4">

          <button
            onClick={addToCart}
            className="bg-black text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition"
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

    </div>

  );

}

export default ProductCard;