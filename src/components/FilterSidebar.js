import React from "react";

function FilterSidebar({
  filters,
  setFilters
}) {

  const brands = ["Nike", "Adidas", "Puma", "Levis"];
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Black", "White", "Blue", "Grey"];

  const handleChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value
    });
  };

  return (
    <div className="w-60 border-r pr-6">

      <h2 className="text-lg font-semibold mb-4">
        Filters
      </h2>

      {/* Brand */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Brand</h3>
        {brands.map((brand) => (
          <p
            key={brand}
            onClick={() => handleChange("brand", brand)}
            className="cursor-pointer mb-1"
          >
            {brand}
          </p>
        ))}
      </div>

      {/* Size */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Size</h3>
        {sizes.map((size) => (
          <p
            key={size}
            onClick={() => handleChange("size", size)}
            className="cursor-pointer mb-1"
          >
            {size}
          </p>
        ))}
      </div>

      {/* Color */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Color</h3>
        {colors.map((color) => (
          <p
            key={color}
            onClick={() => handleChange("color", color)}
            className="cursor-pointer mb-1"
          >
            {color}
          </p>
        ))}
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price</h3>

        <p
          onClick={() => handleChange("price", "low")}
          className="cursor-pointer"
        >
          Under ₹1000
        </p>

        <p
          onClick={() => handleChange("price", "mid")}
          className="cursor-pointer"
        >
          ₹1000 - ₹2000
        </p>

        <p
          onClick={() => handleChange("price", "high")}
          className="cursor-pointer"
        >
          Above ₹2000
        </p>
      </div>

    </div>
  );
}

export default FilterSidebar;