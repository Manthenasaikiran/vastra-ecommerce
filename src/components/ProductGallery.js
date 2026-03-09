import React, { useState } from "react";

function ProductGallery({ images }) {

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (

    <div className="flex flex-col md:flex-row gap-4">

      {/* Thumbnails */}

      <div className="flex md:flex-col gap-3">

        {images.map((img, index) => (

          <img
            key={index}
            src={img}
            alt="thumbnail"
            className="w-16 h-16 object-cover border cursor-pointer hover:border-black"
            onClick={() => setSelectedImage(img)}
          />

        ))}

      </div>


      {/* Main Image */}

      <div className="flex-1">

        <img
          src={selectedImage}
          alt="product"
          className="w-full h-[400px] object-cover rounded"
        />

      </div>

    </div>

  );

}

export default ProductGallery;