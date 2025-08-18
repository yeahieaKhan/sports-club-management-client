import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <div className=" bg-base-200 max-h-2/3  max-w-7xl  mx-auto py-28">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1">
            <img
              src="https://i.ibb.co/23hHWwmq/amadeus-moga-H5-Z8wov-S9ic-unsplash.jpg"
              alt=""
            />
          </div>
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
