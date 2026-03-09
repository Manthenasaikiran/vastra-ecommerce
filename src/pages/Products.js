import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import products from "../data/products";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

function Products() {

  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    size: "",
    color: "",
    price: ""
  });

  const [sort, setSort] = useState("");

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";

    setSearchQuery(search);

  }, [location.search]);

  let filteredProducts = [...products];

  // SEARCH FROM NAVBAR
  if (searchQuery) {

    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  }

  // BRAND
  if (filters.brand) {

    filteredProducts = filteredProducts.filter(
      (p) => p.brand === filters.brand
    );

  }

  // SIZE
  if (filters.size) {

    filteredProducts = filteredProducts.filter(
      (p) => p.size && p.size.includes(filters.size)
    );

  }

  // COLOR
  if (filters.color) {

    filteredProducts = filteredProducts.filter(
      (p) => p.color === filters.color
    );

  }

  // PRICE
  if (filters.price === "low") {

    filteredProducts = filteredProducts.filter(
      (p) => p.price < 1000
    );

  }

  if (filters.price === "mid") {

    filteredProducts = filteredProducts.filter(
      (p) => p.price >= 1000 && p.price <= 2000
    );

  }

  if (filters.price === "high") {

    filteredProducts = filteredProducts.filter(
      (p) => p.price > 2000
    );

  }

  // SORT
  if (sort === "low") {

    filteredProducts.sort((a, b) => a.price - b.price);

  }

  if (sort === "high") {

    filteredProducts.sort((a, b) => b.price - a.price);

  }

  if (sort === "name") {

    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

  }

  return (

    <div className="flex max-w-7xl mx-auto p-6 gap-6">

      <FilterSidebar
        filters={filters}
        setFilters={setFilters}
      />

      <div className="flex-1">

        <h1 className="text-2xl font-bold mb-4">
          All Products
        </h1>

        {/* SORT */}

        <div className="flex justify-end mb-6">

          <select
            className="border px-4 py-2 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >

            <option value="">Sort By</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="name">Name A → Z</option>

          </select>

        </div>

        {/* PRODUCTS */}

        {filteredProducts.length === 0 ? (

          <p>No products found</p>

        ) : (

          <div className="grid grid-cols-3 gap-6">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Products;