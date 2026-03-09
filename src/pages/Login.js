import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import banner from "../assets/vastra-offer.jpg";

function Login() {

  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");

  // Redirect if already logged in
  useEffect(() => {

    const user = localStorage.getItem("vastraUser");

    if (user) {
      navigate("/");
    }

  }, [navigate]);

  const handleContinue = () => {

    if (mobile.length !== 10) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    // Generate OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000);

    alert("Your OTP is: " + generatedOtp);

    // Navigate to OTP page
    navigate("/otp", {
      state: {
        mobile: mobile,
        otp: generatedOtp
      }
    });

  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        {/* Banner */}
        <img
          src={banner}
          alt="Vastra Offer"
          style={styles.banner}
        />

        <div style={styles.content}>

          <h3>Login or Signup</h3>

          {/* Mobile Input */}
          <div style={styles.mobileBox}>

            <span style={styles.code}>+91</span>

            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              maxLength="10"
              onChange={(e)=>{
                const value = e.target.value.replace(/\D/g,"");
                setMobile(value);
              }}
              style={styles.input}
            />

          </div>

          {/* Terms */}
          <p style={styles.terms}>
            By continuing, I agree to the
            <Link to="/terms" style={styles.link}> Terms of Use </Link>
            &
            <Link to="/privacy" style={styles.link}> Privacy Policy</Link>
          </p>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            style={styles.button}
          >
            CONTINUE
          </button>

          {/* Help */}
          <p style={styles.help}>
            Have trouble logging in?
            <span style={styles.link}> Get help</span>
          </p>

        </div>

      </div>

    </div>

  );

}

const styles = {

  page:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#f5f5f5"
  },

  card:{
    width:"380px",
    background:"#fff",
    borderRadius:"8px",
    boxShadow:"0 4px 12px rgba(0,0,0,0.15)",
    overflow:"hidden"
  },

  banner:{
    width:"100%"
  },

  content:{
    padding:"25px"
  },

  mobileBox:{
    display:"flex",
    alignItems:"center",
    border:"1px solid #ccc",
    borderRadius:"6px",
    overflow:"hidden",
    marginTop:"10px"
  },

  code:{
    padding:"12px",
    background:"#f5f5f5",
    borderRight:"1px solid #ccc"
  },

  input:{
    flex:1,
    padding:"12px",
    border:"none",
    outline:"none",
    fontSize:"14px"
  },

  terms:{
    fontSize:"13px",
    marginTop:"12px"
  },

  link:{
    color:"#ff3f6c",
    marginLeft:"5px",
    textDecoration:"none",
    cursor:"pointer"
  },

  button:{
    width:"100%",
    padding:"12px",
    marginTop:"15px",
    background:"#ff3f6c",
    color:"#fff",
    border:"none",
    borderRadius:"4px",
    fontWeight:"bold",
    cursor:"pointer"
  },

  help:{
    fontSize:"13px",
    marginTop:"12px"
  }

};

export default Login;