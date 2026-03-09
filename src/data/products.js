import shirt from "../assets/images/shirt.jpg";
import tshirt from "../assets/images/tshirt.jpg";
import jeans from "../assets/images/jeans.jpg";
import hoodie from "../assets/images/hoodie.jpg";
import jacket from "../assets/images/jacket.jpg";

const products = [

{
id: 1,
name: "Black Casual Shirt",
price: 999,
category: "Shirts",
brand: "Vastra",
color: "Black",
size: ["S","M","L","XL"],
image: shirt,
description: "Premium cotton casual shirt for men."
},

{
id: 2,
name: "White Basic T-Shirt",
price: 599,
category: "T-Shirts",
brand: "Nike",
color: "White",
size: ["S","M","L","XL"],
image: tshirt,
description: "Comfortable everyday wear t-shirt."
},

{
id: 3,
name: "Blue Denim Jeans",
price: 1299,
category: "Jeans",
brand: "Levi's",
color: "Blue",
size: ["30","32","34","36"],
image: jeans,
description: "Slim fit stretch denim jeans."
},

{
id: 4,
name: "Grey Hoodie",
price: 1499,
category: "Hoodies",
brand: "Adidas",
color: "Grey",
size: ["S","M","L","XL"],
image: hoodie,
description: "Warm winter hoodie with premium fabric."
},

{
id: 5,
name: "Winter Jacket",
price: 1999,
category: "Jackets",
brand: "Puma",
color: "Black",
size: ["M","L","XL"],
image: jacket,
description: "Stylish winter jacket for cold weather."
}

];

export default products;