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
        minHeight: "420px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >

      <div
        style={{
          background: "rgba(0,0,0,0.65)",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          maxWidth: "600px",
          width: "100%"
        }}
      >

        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(24px, 4vw, 36px)",
            marginBottom: "10px",
            lineHeight: "1.3"
          }}
        >
          New Men's Fashion Collection
        </h1>

        <p
          style={{
            color: "#ddd",
            marginBottom: "20px",
            fontSize: "clamp(14px,2vw,16px)"
          }}
        >
          Discover trending outfits
        </p>

        <Link
          to="/products"
          style={{
            background: "#fff",
            color: "#000",
            padding: "12px 28px",
            borderRadius: "8px",
            fontWeight: "bold",
            textDecoration: "none",
            display: "inline-block"
          }}
        >
          Shop Now
        </Link>

      </div>

    </section>

  );

}

export default HeroBanner;