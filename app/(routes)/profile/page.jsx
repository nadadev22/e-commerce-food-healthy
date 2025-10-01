"use client";
import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <div className="p-8 text-center">No user data found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center"> My profile</h2>
      <div className="mb-2">
        <span className="font-semibold">Name: </span>
        {user.username || user.name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Email: </span>
        {user.email}
      </div>
      <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
        Edit Profile
      </button>

      {/* Add more fields as needed */}
    </div>
  );
}

export default Profile;
