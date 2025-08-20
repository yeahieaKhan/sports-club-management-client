import React from "react";
import { Outlet } from "react-router"; // make sure it's react-router-dom
import Lottie from "react-lottie";
import LottifesIcons from "../../../public/register.json"; // your Lottie JSON

const AuthLayout = () => {
  // Lottie configuration
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LottifesIcons,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center py-28">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 justify-around">
          {/* Outlet for nested routes */}
          <div className="flex-1">
            <Outlet />
          </div>
          {/* Lottie Animation */}
          <div className="flex-1">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
