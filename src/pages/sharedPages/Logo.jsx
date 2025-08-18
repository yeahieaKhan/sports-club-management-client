import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <div className="flex max-w-9 max-h-12 items-end">
          <img
            className="mb-2"
            src={
              "https://i.ibb.co/hJ53VYk3/sports-club-logo-design-template-ec333e0614aedcc2ce92441fb7cb80d2-screen-1.jpg"
            }
            alt=""
          />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
