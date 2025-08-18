import React from "react";
import NavBar from "../pages/sharedPages/NavBar";
import { Outlet } from "react-router";
import Footer from "../pages/sharedPages/Footer";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
