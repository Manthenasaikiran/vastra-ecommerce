import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          ✅ Order Placed Successfully
        </h1>

        <p style={styles.text}>
          Thank you for shopping with Vastra.
        </p>

        <p style={styles.text}>
          Your order will be delivered in 3-5 days.
        </p>

        <Link to="/products">

          <button style={styles.button}>
            Continue Shopping
          </button>

        </Link>

      </div>

    </div>

  );

}

const styles = {

  container:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"70vh"
  },

  card:{
    background:"#fff",
    padding:"40px",
    borderRadius:"10px",
    boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
    textAlign:"center"
  },

  title:{
    color:"#16a34a",
    marginBottom:"15px"
  },

  text:{
    marginBottom:"10px",
    fontSize:"16px"
  },

  button:{
    marginTop:"20px",
    padding:"10px 20px",
    background:"#111827",
    color:"#fff",
    border:"none",
    borderRadius:"6px",
    cursor:"pointer"
  }

};

export default OrderSuccess;