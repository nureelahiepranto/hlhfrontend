import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-lg text-gray-700 mt-2">You do not have permission to view this page.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
