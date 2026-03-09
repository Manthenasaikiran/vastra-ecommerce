import React, { createContext, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlistItems, setWishlistItems] = useState([]);

  /* Add to Wishlist */

  const addToWishlist = (product) => {

    const existingItem = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (!existingItem) {

      setWishlistItems([
        ...wishlistItems,
        product
      ]);

    }

  };


  /* Remove from Wishlist */

  const removeFromWishlist = (id) => {

    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== id
    );

    setWishlistItems(updatedWishlist);

  };


  /* Check if item exists */

  const isInWishlist = (id) => {

    return wishlistItems.some(
      (item) => item.id === id
    );

  };


  return (

    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

};