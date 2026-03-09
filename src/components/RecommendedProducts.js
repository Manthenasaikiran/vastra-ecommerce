import React from "react"
import { getProducts } from "../data/productDB"
import ProductCard from "./ProductCard"

function RecommendedProducts(){

const products = getProducts().slice(0,4)

return(

<div style={{padding:"40px"}}>

<h2 style={{
fontSize:"24px",
fontWeight:"bold",
marginBottom:"20px"
}}>

Recommended for You

</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px"
}}>

{products.map(p=>(

<ProductCard
key={p.id}
product={p}
/>

))}

</div>

</div>

)

}

export default RecommendedProducts