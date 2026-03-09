import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Otp() {

  const navigate = useNavigate();
  const location = useLocation();

  const mobile = location.state?.mobile || "";
  const realOtp = location.state?.otp || "";

  const [otp, setOtp] = useState("");

  const verifyOtp = () => {

    if (otp === String(realOtp)) {

      const userData = {
        mobile: mobile
      };

      localStorage.setItem("vastraUser", JSON.stringify(userData));

      alert("OTP Verified Successfully");

      navigate("/");

    } else {

      alert("Invalid OTP");

    }

  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h2>Verify with OTP</h2>

        <p>Sent to {mobile}</p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          maxLength="4"
          onChange={(e) => setOtp(e.target.value)}
          style={styles.input}
        />

        <button onClick={verifyOtp} style={styles.button}>
          VERIFY
        </button>

      </div>

    </div>

  );

}

const styles = {
page:{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"},
card:{width:"350px",background:"#fff",padding:"30px",textAlign:"center"},
input:{width:"100%",padding:"10px",marginTop:"20px"},
button:{width:"100%",padding:"12px",marginTop:"20px",background:"#ff3f6c",color:"#fff",border:"none"}
};

export default Otp;