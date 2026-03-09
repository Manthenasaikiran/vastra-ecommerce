const formatPrice = (price) => {

  if (!price && price !== 0) {
    return "₹0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);

};

export default formatPrice;