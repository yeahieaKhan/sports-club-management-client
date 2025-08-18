import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="text-center p-8 bg-white shadow-lg rounded-2xl max-w-md w-full space-y-6">
        <div className="flex justify-center"></div>
        <h2 className="text-3xl font-bold text-red-600">403 Forbidden</h2>
        <p className="text-gray-600">
          You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="btn btn-error text-white font-semibold normal-case"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
