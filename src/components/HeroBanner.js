import React from "react";
import { Link } from "react-router-dom";

import heroImage from "../assets/images/hero.jpg";

function HeroBanner() {

  return (

    <section
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "420px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >

      <div
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: "40px",
          borderRadius: "10px",
          textAlign: "center"
        }}
      >

        <h1
          style={{
            color: "#fff",
            fontSize: "36px",
            marginBottom: "10px"
          }}
        >
          New Men's Fashion Collection
        </h1>

        <p
          style={{
            color: "#ddd",
            marginBottom: "20px"
          }}
        >
          Discover trending outfits
        </p>

        <Link
          to="/products"
          style={{
            background: "#fff",
            color: "#000",
            padding: "10px 25px",
            borderRadius: "6px",
            fontWeight: "bold",
            textDecoration: "none"
          }}
        >
          Shop Now
        </Link>

      </div>

    </section>

  );

}

export default HeroBanner;