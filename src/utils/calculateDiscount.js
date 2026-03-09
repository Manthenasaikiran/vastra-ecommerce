const calculateDiscount = (price, discountPercent) => {

  if (!price || !discountPercent) {
    return price;
  }

  const discountAmount = (price * discountPercent) / 100;

  const finalPrice = price - discountAmount;

  return Math.round(finalPrice);

};

export default calculateDiscount;