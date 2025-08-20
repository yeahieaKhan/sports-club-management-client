import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import useUsersRole from "../../hooks/useUsersRole";
import { AuthContext } from "../../contextApi/AuthContext";

import Loading from "../../pages/loading/Loading";

const DashboardLayout = () => {
  const { role, roleLoading } = useUsersRole();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (roleLoading) {
    return <Loading></Loading>;
  }

  console.log(typeof role);
  console.log(typeof role.role);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden justify-between">
          <div className="flex-1 px-2 text-xl font-bold">Dashboard</div>
          <div className="flex-none">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu text-white min-h-full w-80 bg-red-400 p-4">
          {/* Sidebar content here */}
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          {/* --------user router --------- */}

          {/* -------------------- member router ---------------- */}
          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/user-profile">User Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pending/booking">
                  Pending Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcement">Announcements</NavLink>
              </li>
            </>
          )}

          {role === "member" && (
            <>
              <li>
                <NavLink to="/dashboard/member-profile">Member Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pending/booking">
                  Pending Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/approved/booking">
                  Approved Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/confirmed-booking-members">
                  Confirom Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history">
                  payment-history
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/announcement">Announcements</NavLink>
              </li>
            </>
          )}
          {/* -------------------admin router --------------*/}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin-profile">Admin Profile</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addCourts">Add Courts</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/adminCourts">All Courts</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allusers">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage/booking">Manage Booking</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage/member">Manage Members</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcements">
                  Make Announcements
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/show-announcement">
                  Show All Announcements
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-confimed-booking">
                  All Confiremd booking
                </NavLink>
              </li>
            </>
          )}

          <li>
            {" "}
            <button onClick={handleLogOut}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
