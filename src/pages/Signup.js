import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const handleSignup = () => {

    if (!name || !email || !mobile) {
      alert("Please fill all required fields");
      return;
    }

    if (mobile.length !== 10) {
      alert("Enter valid 10 digit mobile number");
      return;
    }

    const userData = {
      name,
      email,
      mobile,
      gender,
      address
    };

    // Save user
    localStorage.setItem("vastraUser", JSON.stringify(userData));

    alert("Account Created Successfully 🎉");

    navigate("/");

  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          maxLength="10"
          onChange={(e)=>setMobile(e.target.value.replace(/\D/g,""))}
          style={styles.input}
        />

        <select
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          style={styles.textarea}
        />

        <button
          onClick={handleSignup}
          style={styles.button}
        >
          CREATE ACCOUNT
        </button>

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
    width:"400px",
    background:"#fff",
    padding:"30px",
    borderRadius:"8px",
    boxShadow:"0 4px 12px rgba(0,0,0,0.15)"
  },

  input:{
    width:"100%",
    padding:"12px",
    marginTop:"10px",
    border:"1px solid #ccc",
    borderRadius:"6px"
  },

  textarea:{
    width:"100%",
    padding:"12px",
    marginTop:"10px",
    border:"1px solid #ccc",
    borderRadius:"6px",
    minHeight:"80px"
  },

  button:{
    width:"100%",
    padding:"12px",
    marginTop:"20px",
    background:"#ff3f6c",
    color:"#fff",
    border:"none",
    borderRadius:"6px",
    fontWeight:"bold",
    cursor:"pointer"
  }

};

export default Signup;