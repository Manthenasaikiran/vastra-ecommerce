import React from "react"
import { useNavigate } from "react-router-dom"

function FloatingCart(){

const navigate = useNavigate()

return(

<div
onClick={()=>navigate("/cart")}
style={{
position:"fixed",
bottom:"30px",
right:"30px",
background:"#000",
color:"#fff",
padding:"14px 20px",
borderRadius:"50px",
cursor:"pointer",
boxShadow:"0 5px 15px rgba(0,0,0,0.3)",
zIndex:999
}}
>

🛒 Cart

</div>

)

}

export default FloatingCart