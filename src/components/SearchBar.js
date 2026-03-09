import React, { useState } from "react";

function SearchBar({ products, setFilteredProducts }) {

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(filtered);

  };

  return (

    <div className="flex items-center border rounded-lg overflow-hidden">

      <input
        type="text"
        placeholder="Search products..."
        className="px-3 py-2 outline-none"
        value={search}
        onChange={handleSearch}
      />

      <button className="bg-black text-white px-4 py-2">

        Search

      </button>

    </div>

  );

}

export default SearchBar;