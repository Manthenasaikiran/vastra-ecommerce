import React, { useState, useEffect } from "react";

function FlashSale() {

const [time,setTime] = useState(3600);

useEffect(()=>{

const timer = setInterval(()=>{

setTime(t => t > 0 ? t-1 : 0)

},1000)

return () => clearInterval(timer)

},[])

const minutes = Math.floor(time/60)
const seconds = time % 60

return(

<div style={{
background:"#ff3f6c",
color:"#fff",
padding:"12px",
textAlign:"center",
fontWeight:"bold"
}}>

🔥 Flash Sale Ends In {minutes}:{seconds}

</div>

)

}

export default FlashSale