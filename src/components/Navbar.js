import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo/logo.png";
import cartIcon from "../assets/icons/cart.png";
import userIcon from "../assets/icons/user.png";
import wishlistIcon from "../assets/icons/wishlist.png";
import searchIcon from "../assets/icons/search.png";
import menuIcon from "../assets/icons/menu.png";

function Navbar() {

const navigate = useNavigate();

const [menuOpen, setMenuOpen] = useState(false);
const [dark, setDark] = useState(false);
const [cartCount, setCartCount] = useState(0);
const [search, setSearch] = useState("");
const [installPrompt, setInstallPrompt] = useState(null);


// CART COUNT
useEffect(() => {

const updateCart = () => {

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const totalItems = cart.reduce(
(sum, item) => sum + (item.quantity || 1),
0
);

setCartCount(totalItems);

};

updateCart();

window.addEventListener("storage", updateCart);

return () => window.removeEventListener("storage", updateCart);

}, []);


// PWA INSTALL
useEffect(() => {

window.addEventListener("beforeinstallprompt", (e) => {

e.preventDefault();
setInstallPrompt(e);

});

}, []);


const installApp = () => {

if (!installPrompt) {
alert("Install not available");
return;
}

installPrompt.prompt();

};


// SEARCH
const handleSearch = () => {

if (search.trim() !== "") {

navigate(`/products?search=${search}`);
setSearch("");

}

};


// LOGOUT
const logout = () => {

localStorage.removeItem("vastraUser");
navigate("/login");

};


// DARK MODE
const toggleDark = () => {

setDark(!dark);

document.body.style.background = dark ? "#fff" : "#111";
document.body.style.color = dark ? "#000" : "#fff";

};


return (

<nav style={styles.nav}>

<div style={styles.container}>

{/* LOGO */}

<Link to="/" style={styles.logoBox}>

<img src={logo} alt="logo" style={styles.logo}/>

<span style={styles.brand}>Vastra</span>

</Link>


{/* MENU DESKTOP */}

<div style={styles.menuDesktop}>

<Link to="/" style={styles.link}>Home</Link>
<Link to="/products" style={styles.link}>Products</Link>
<Link to="/wishlist" style={styles.link}>Wishlist</Link>
<Link to="/orders" style={styles.link}>Orders</Link>
<Link to="/admin" style={styles.link}>Admin</Link>

</div>


{/* SEARCH */}

<div style={styles.searchBox}>

<input
type="text"
placeholder="Search"
value={search}
onChange={(e)=>setSearch(e.target.value)}
onKeyDown={(e)=> e.key === "Enter" && handleSearch()}
style={styles.searchInput}
/>

<button onClick={handleSearch} style={styles.searchButton}>

<img src={searchIcon} alt="search" style={styles.searchIcon}/>

</button>

</div>


{/* ICONS */}

<div style={styles.icons}>

<Link to="/wishlist">
<img src={wishlistIcon} alt="wishlist" style={styles.icon}/>
</Link>


<Link to="/cart" style={styles.cartBox}>

<img src={cartIcon} alt="cart" style={styles.icon}/>

{cartCount > 0 && (
<span style={styles.cartCount}>{cartCount}</span>
)}

</Link>


<Link to="/profile">
<img src={userIcon} alt="profile" style={styles.icon}/>
</Link>


<button onClick={installApp} style={styles.install}>
Install
</button>


<button onClick={toggleDark} style={styles.darkButton}>
🌙
</button>


<button onClick={logout} style={styles.logout}>
Logout
</button>


{/* MOBILE MENU BUTTON */}

<button
style={styles.menuButton}
onClick={() => setMenuOpen(!menuOpen)}
>

<img src={menuIcon} alt="menu" style={styles.icon}/>

</button>

</div>

</div>


{/* MOBILE MENU */}

{menuOpen && (

<div style={styles.mobileMenu}>

<Link to="/" style={styles.mobileLink}>Home</Link>
<Link to="/products" style={styles.mobileLink}>Products</Link>
<Link to="/wishlist" style={styles.mobileLink}>Wishlist</Link>
<Link to="/orders" style={styles.mobileLink}>Orders</Link>
<Link to="/cart" style={styles.mobileLink}>Cart</Link>
<Link to="/admin" style={styles.mobileLink}>Admin Panel</Link>

</div>

)}

</nav>

);

}


const styles = {

nav:{
background:"#111827",
color:"#fff",
padding:"10px 20px"
},

container:{
maxWidth:"1200px",
margin:"auto",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
flexWrap:"wrap",
gap:"10px"
},

logoBox:{
display:"flex",
alignItems:"center",
textDecoration:"none",
color:"#fff"
},

logo:{
height:"32px",
marginRight:"8px"
},

brand:{
fontSize:"20px",
fontWeight:"bold"
},

menuDesktop:{
display:"flex",
gap:"20px"
},

link:{
textDecoration:"none",
color:"#fff",
fontWeight:"500"
},

searchBox:{
display:"flex",
alignItems:"center",
background:"#fff",
borderRadius:"6px",
padding:"3px",
width:"180px"
},

searchInput:{
border:"none",
outline:"none",
padding:"6px",
flex:1,
fontSize:"14px",
color:"#000"
},

searchButton:{
border:"none",
background:"transparent",
cursor:"pointer"
},

searchIcon:{
width:"18px"
},

icons:{
display:"flex",
alignItems:"center",
gap:"12px"
},

icon:{
width:"22px",
cursor:"pointer"
},

cartBox:{
position:"relative"
},

cartCount:{
position:"absolute",
top:"-6px",
right:"-8px",
background:"red",
color:"#fff",
borderRadius:"50%",
fontSize:"12px",
padding:"2px 6px"
},

logout:{
background:"#ff3f6c",
border:"none",
color:"#fff",
padding:"6px 10px",
borderRadius:"5px",
cursor:"pointer"
},

install:{
background:"#22c55e",
border:"none",
color:"#fff",
padding:"6px 10px",
borderRadius:"5px",
cursor:"pointer"
},

darkButton:{
background:"#333",
border:"none",
color:"#fff",
padding:"6px 10px",
borderRadius:"5px",
cursor:"pointer"
},

menuButton:{
background:"none",
border:"none",
display:"none"
},

mobileMenu:{
marginTop:"10px",
display:"flex",
flexDirection:"column",
gap:"10px"
},

mobileLink:{
textDecoration:"none",
color:"#fff"
}

};

export default Navbar;