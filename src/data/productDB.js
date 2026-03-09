export const getProducts = () => {

  const products =
    JSON.parse(localStorage.getItem("products"));

  return products || [];

};

export const saveProduct = (product) => {

  const products =
    JSON.parse(localStorage.getItem("products")) || [];

  products.push(product);

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

};

export const deleteProduct = (id) => {

  let products =
    JSON.parse(localStorage.getItem("products")) || [];

  products = products.filter(
    (p) => p.id !== id
  );

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

};