import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contextApi/AuthContext";
import Logo from "./Logo";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user?.displayName);
  console.log(user?.photoURL);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("Logged out successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-Courts">All Courts</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto">
        {/* Logo + Site Name */}
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">
            <Logo></Logo>
            <span>Sports Club</span>
          </Link>
        </div>

        {/* Center Menu (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 px-1">{links}</ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end">
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>

          {/* Conditional Profile/Login */}
          {user ? (
            <div className="dropdown dropdown-end ml-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL || "/default-avatar.png"} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="text-center text-sm text-gray-600 font-medium">
                  {user.displayName || user.email}
                </li>
                <div className="divider my-1" />
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary ml-3">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
