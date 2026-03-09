const CART_KEY = "vastra_cart";


/* Get Cart Items */

export const getCart = () => {

  const cart = localStorage.getItem(CART_KEY);

  return cart ? JSON.parse(cart) : [];

};


/* Save Cart */

const saveCart = (cartItems) => {

  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cartItems)
  );

};


/* Add To Cart */

export const addToCart = (product) => {

  const cart = getCart();

  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  saveCart(cart);

};


/* Remove From Cart */

export const removeFromCart = (id) => {

  const cart = getCart().filter(
    (item) => item.id !== id
  );

  saveCart(cart);

};


/* Update Quantity */

export const updateQuantity = (id, quantity) => {

  const cart = getCart().map((item) =>
    item.id === id
      ? { ...item, quantity }
      : item
  );

  saveCart(cart);

};


/* Clear Cart */

export const clearCart = () => {

  localStorage.removeItem(CART_KEY);

};