import React, { useEffect, useState } from "react";

function Wishlist() {

  const [wishlist,setWishlist] = useState([]);

  useEffect(()=>{

    const stored =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(stored);

  },[]);

  const removeItem = (id)=>{

    const updated =
      wishlist.filter(item => item.id !== id);

    setWishlist(updated);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

  };

  if(wishlist.length === 0){
    return <h2 className="p-6">Wishlist is empty</h2>
  }

  return(

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        My Wishlist
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {wishlist.map(product=>(
          
          <div key={product.id}
          className="border p-4 rounded">

            <img
            src={product.image}
            alt={product.name}
            className="h-52 w-full object-cover"/>

            <h3 className="mt-2 font-semibold">
              {product.name}
            </h3>

            <p>₹{product.price}</p>

            <button
            onClick={()=>removeItem(product.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
            Remove
            </button>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Wishlist;