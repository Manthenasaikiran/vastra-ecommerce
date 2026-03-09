import React from "react";
import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="bg-black text-white mt-10">

      <div className="container mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand Section */}

          <div>

            <h2 className="text-2xl font-bold mb-3">
              Vastra
            </h2>

            <p className="text-gray-400">
              Vastra is a modern fashion ecommerce store offering
              premium clothing for men with stylish and comfortable designs.
            </p>

          </div>


          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2">

              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/products" className="hover:text-gray-300">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/wishlist" className="hover:text-gray-300">
                  Wishlist
                </Link>
              </li>

              <li>
                <Link to="/orders" className="hover:text-gray-300">
                  Orders
                </Link>
              </li>

            </ul>

          </div>


          {/* Contact Section */}

          <div>

            <h3 className="text-xl font-semibold mb-3">
              Contact Us
            </h3>

            <p className="text-gray-400">
              Email: support@vastra.com
            </p>

            <p className="text-gray-400">
              Phone: +91 9265623063
            </p>

            <p className="text-gray-400">
              Location: Hyderabad, India
            </p>

          </div>

        </div>


        {/* Bottom Footer */}

        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">

          <p>
            © {new Date().getFullYear()} Vastra Fashion. All rights reserved.
          </p>

        </div>

      </div>

    </footer>

  );

}

export default Footer;