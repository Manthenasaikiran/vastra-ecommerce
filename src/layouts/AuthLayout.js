import React from "react";
import { Link } from "react-router-dom";

function AuthLayout({ children }) {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md">

        {/* Logo / Brand */}

        <div className="text-center mb-6">

          <Link to="/" className="text-3xl font-bold text-black">

            Vastra

          </Link>

          <p className="text-gray-500">
            Modern Fashion Store
          </p>

        </div>


        {/* Auth Card */}

        <div className="bg-white shadow-lg rounded-lg p-6">

          {children}

        </div>

      </div>

    </div>

  );

}

export default AuthLayout;