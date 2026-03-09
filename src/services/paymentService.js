/* Load Razorpay Script */

export const loadRazorpayScript = () => {

  return new Promise((resolve) => {

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {

      resolve(true);

    };

    script.onerror = () => {

      resolve(false);

    };

    document.body.appendChild(script);

  });

};



/* Open Razorpay Payment */

export const initiatePayment = async (
  amount,
  user,
  onSuccess
) => {

  const res = await loadRazorpayScript();

  if (!res) {

    alert("Razorpay SDK failed to load");

    return;

  }

  const options = {

    key: "YOUR_RAZORPAY_KEY",

    amount: amount * 100,

    currency: "INR",

    name: "Vastra Fashion",

    description: "Order Payment",

    handler: function (response) {

      console.log("Payment Success:", response);

      onSuccess(response);

    },

    prefill: {

      name: user?.name || "Customer",

      email: user?.email || "customer@example.com",

      contact: "9999999999"

    },

    theme: {

      color: "#000000"

    }

  };


  const paymentObject = new window.Razorpay(options);

  paymentObject.open();

};