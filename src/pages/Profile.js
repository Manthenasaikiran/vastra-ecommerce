import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {

    const storedUser =
      JSON.parse(localStorage.getItem("vastraUser"));

    if (!storedUser) {

      navigate("/login");

    } else {

      setUser(storedUser);

      setName(storedUser.name || "");
      setEmail(storedUser.email || "");
      setMobile(storedUser.mobile || "");
      setAddress(storedUser.address || "");

    }

  }, [navigate]);

  const handleSave = () => {

    const updatedUser = {
      ...user,
      name,
      email,
      mobile,
      address
    };

    localStorage.setItem(
      "vastraUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    setEditMode(false);

    alert("Profile Updated Successfully");

  };

  const handleLogout = () => {

    localStorage.removeItem("vastraUser");

    navigate("/login");

  };

  if (!user) return null;

  return (

    <div className="container mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="border p-6 rounded shadow w-96">

        {!editMode ? (

          <>
            <p className="mb-2">
              <strong>Name:</strong> {user.name || "Not Added"}
            </p>

            <p className="mb-2">
              <strong>Email:</strong> {user.email || "Not Added"}
            </p>

            <p className="mb-2">
              <strong>Mobile:</strong> {user.mobile || "Not Added"}
            </p>

            <p className="mb-4">
              <strong>Address:</strong> {user.address || "Not Added"}
            </p>

            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>

        ) : (

          <>
            <input
              type="text"
              className="border w-full p-2 mb-3 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              type="email"
              className="border w-full p-2 mb-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              type="text"
              className="border w-full p-2 mb-3 rounded"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile"
            />

            <textarea
              className="border w-full p-2 mb-3 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />

            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>

            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>

        )}

      </div>

    </div>

  );

}

export default Profile;