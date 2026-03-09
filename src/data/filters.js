import categories from "./categories";
import brands from "./brands";
import colors from "./colors";
import sizes from "./sizes";

const filters = {

categories,

brands,

colors,

sizes,

priceRanges: [

{
id:1,
label:"Under ₹500",
min:0,
max:500
},

{
id:2,
label:"₹500 - ₹1000",
min:500,
max:1000
},

{
id:3,
label:"₹1000 - ₹2000",
min:1000,
max:2000
},

{
id:4,
label:"₹2000 - ₹5000",
min:2000,
max:5000
},

{
id:5,
label:"Above ₹5000",
min:5000,
max:100000
}

]

};

export default filters;