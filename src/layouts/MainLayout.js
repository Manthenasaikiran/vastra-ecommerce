import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {

  return (

    <div className="flex flex-col min-h-screen">

      {/* Navbar */}

      <Navbar />


      {/* Main Content */}

      <main className="flex-grow container mx-auto p-6">

        {children}

      </main>


      {/* Footer */}

      <Footer />

    </div>

  );

}

export default MainLayout;