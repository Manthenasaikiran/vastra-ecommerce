import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getProducts, saveProduct, deleteProduct } from "../data/productDB";

function Admin() {

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Load products
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // Admin security (after hooks)
  if (localStorage.getItem("admin") !== "true") {
    return <Navigate to="/" />;
  }

  // Add product
  const addProduct = () => {

    if (!name || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      image,
      category: "Fashion"
    };

    saveProduct(newProduct);

    setProducts(getProducts());

    setName("");
    setPrice("");
    setImage("");
  };

  // Delete product
  const removeProduct = (id) => {

    deleteProduct(id);

    setProducts(getProducts());

  };

  return (

    <div className="container mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Panel
      </h1>

      {/* Add Product */}

      <div className="border p-4 mb-6 rounded">

        <h2 className="text-xl mb-3 font-semibold">
          Add Product
        </h2>

        <div className="flex flex-wrap gap-3">

          <input
            className="border p-2 rounded"
            placeholder="Product Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Image URL"
            value={image}
            onChange={(e)=>setImage(e.target.value)}
          />

          <button
            onClick={addProduct}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Add Product
          </button>

        </div>

      </div>

      {/* Product List */}

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (

        products.map((product)=>(

          <div
            key={product.id}
            className="border p-4 mb-3 flex items-center justify-between rounded"
          >

            <div className="flex items-center gap-4">

              <img
                loading="lazy"
                src={product.image || "/placeholder.png"}
                alt={product.name}
                onError={(e)=>{e.target.src="/placeholder.png"}}
                className="w-16 h-16 object-cover rounded"
              />

              <div>

                <h3 className="font-semibold">
                  {product.name}
                </h3>

                <p>₹{product.price}</p>

              </div>

            </div>

            <button
              onClick={()=>removeProduct(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>

          </div>

        ))

      )}

    </div>

  );

}

export default Admin;