import React from "react";
import { useNavigate } from "react-router-dom";

import HeroBanner from "../components/HeroBanner";
import FlashSale from "../components/FlashSale";
import RecommendedProducts from "../components/RecommendedProducts";
import products from "../data/products";

function Home() {

  const navigate = useNavigate();

  const categories = [
    "Shirts",
    "T-Shirts",
    "Jeans",
    "Hoodies",
    "Jackets",
    "Sweatshirts",
    "Shorts",
    "Tracks",
    "Blazers",
    "Accessories"
  ];

  const trendingProducts = products.slice(0, 4);

  return (

    <div style={styles.container}>

      {/* HERO BANNER */}
      <HeroBanner />
      <FlashSale />
      <RecommendedProducts />


      {/* CATEGORY SECTION */}

      <div style={styles.categorySection}>

        <h2>Shop by Category</h2>

        <div style={styles.grid}>

          {categories.map((cat, index) => (

            <div
              key={index}
              style={styles.card}
              onClick={() => navigate("/products")}
            >
              {cat}
            </div>

          ))}

        </div>

      </div>


      {/* TRENDING PRODUCTS */}

      <div style={styles.trending}>

        <h2>Trending Products</h2>

        <div style={styles.productGrid}>

          {trendingProducts.map((product) => (

            <div key={product.id} style={styles.productCard}>

              <img
                src={product.image}
                alt={product.name}
                style={styles.productImage}
              />

              <h4>{product.name}</h4>

              <p>₹{product.price}</p>

              <button
                style={styles.buyButton}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                View
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

const styles = {

container:{
padding:"40px"
},

categorySection:{
marginTop:"40px",
textAlign:"center"
},

grid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:"20px",
marginTop:"20px"
},

card:{
padding:"20px",
background:"#f5f5f5",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"500"
},

trending:{
marginTop:"60px"
},

productGrid:{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
gap:"20px",
marginTop:"20px"
},

productCard:{
border:"1px solid #eee",
padding:"15px",
borderRadius:"8px",
textAlign:"center"
},

productImage:{
width:"100%",
height:"220px",
objectFit:"cover",
borderRadius:"6px"
},

buyButton:{
marginTop:"10px",
padding:"8px 16px",
background:"#000",
color:"#fff",
border:"none",
borderRadius:"5px",
cursor:"pointer"
}

};

export default Home;