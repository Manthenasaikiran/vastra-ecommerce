import React from "react";
import { Link } from "react-router-dom";

function AdminLayout({ children }) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <aside className="w-64 bg-black text-white p-6">

        <h2 className="text-2xl font-bold mb-6">
          Vastra Admin
        </h2>

        <nav className="space-y-4">

          <Link
            to="/admin/dashboard"
            className="block hover:text-gray-300"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className="block hover:text-gray-300"
          >
            Manage Products
          </Link>

          <Link
            to="/admin/orders"
            className="block hover:text-gray-300"
          >
            Orders
          </Link>

          <Link
            to="/admin/users"
            className="block hover:text-gray-300"
          >
            Users
          </Link>

        </nav>

      </aside>


      {/* Main Content */}

      <div className="flex-1 flex flex-col">


        {/* Header */}

        <header className="bg-white shadow p-4 flex justify-between">

          <h1 className="text-xl font-semibold">
            Admin Dashboard
          </h1>

          <span className="text-gray-600">
            Admin Panel
          </span>

        </header>


        {/* Page Content */}

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;