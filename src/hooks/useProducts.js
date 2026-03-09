import { useState, useEffect } from "react";

import { getProducts } from "../services/productService";

const useProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getProducts();

        setProducts(data || []);

      } catch (error) {

        console.error("Error fetching products:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  return {

    products,
    loading

  };

};

export default useProducts;