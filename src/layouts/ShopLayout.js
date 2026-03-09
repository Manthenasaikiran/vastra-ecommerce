import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ShopLayout({ children }) {

  return (

    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* Navbar */}

      <Navbar />


      {/* Shop Content */}

      <main className="flex-grow container mx-auto p-6">

        {children}

      </main>


      {/* Footer */}

      <Footer />

    </div>

  );

}

export default ShopLayout;