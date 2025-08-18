import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../components/Home/Home";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import AddCourts from "../components/AddCourts";
import CourtShow from "../pages/CourtShow";
import AllCourts from "../components/Dashboard/AllCourts";
import ApproveBooking from "../components/Dashboard/ApproveBooking";
import AllUsers from "../components/Dashboard/AllUsers";
import ManageBooking from "../components/Dashboard/ManageBooking";
import PendingBooking from "../components/Dashboard/PendingBooking";
import AdminProfile from "../components/Dashboard/AdminProfile";
import UserProfile from "../components/Dashboard/UserProfile";
import ManageMember from "../components/Dashboard/ManageMember";
import AdminRouter from "./AdminRouter";
import Forbidden from "../pages/Forbidden";
import MakeAnnouncement from "../components/Dashboard/MakeAnnouncement";
import ShowAllAnnouncements from "../components/Dashboard/ShowAllAnnouncements";
import UserMemberAnnounce from "../components/Dashboard/UserMemberAnnounce";
import Payment from "../components/Dashboard/Payment/Payment";
import MemberRouter from "../components/Dashboard/MemberRouter";
import MemberProfile from "../components/Dashboard/MemberProfile";
import AllConfirmedBooking from "../components/Dashboard/AllConfirmedBooking";
import ConfirmedbookingMember from "../components/Dashboard/ConfirmedbookingMember";
import PaymentHistory from "../components/Dashboard/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-Courts",
        Component: CourtShow,
      },
      {
        path: "forbidden",
        element: <Forbidden></Forbidden>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "addCourts",
        element: (
          <AdminRouter>
            <AddCourts></AddCourts>,
          </AdminRouter>
        ),
      },
      {
        path: "adminCourts",
        element: (
          <AdminRouter>
            <AllCourts></AllCourts>,
          </AdminRouter>
        ),
      },
      {
        path: "manage/booking",
        element: (
          <AdminRouter>
            <ManageBooking></ManageBooking>,
          </AdminRouter>
        ),
      },
      {
        path: "manage/member",
        element: (
          <AdminRouter>
            <ManageMember></ManageMember>,
          </AdminRouter>
        ),
      },
      {
        path: "allusers",
        element: (
          <AdminRouter>
            <AllUsers></AllUsers>,
          </AdminRouter>
        ),
      },

      {
        path: "admin-profile",
        element: (
          <AdminRouter>
            <AdminProfile></AdminProfile>,
          </AdminRouter>
        ),
      },
      {
        path: "announcements",
        element: (
          <AdminRouter>
            <MakeAnnouncement></MakeAnnouncement>,
          </AdminRouter>
        ),
      },
      {
        path: "all-confimed-booking",
        element: (
          <AdminRouter>
            <AllConfirmedBooking></AllConfirmedBooking>
          </AdminRouter>
        ),
      },

      {
        path: "show-announcement",
        element: (
          <AdminRouter>
            <ShowAllAnnouncements></ShowAllAnnouncements>,
          </AdminRouter>
        ),
      },
      {
        path: "approved/booking",
        element: (
          <MemberRouter>
            <ApproveBooking></ApproveBooking>,
          </MemberRouter>
        ),
      },
      {
        path: "confirmed-booking-members",
        element: <ConfirmedbookingMember></ConfirmedbookingMember>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },

      {
        path: "payment/:id",
        element: (
          <MemberRouter>
            <Payment></Payment>,
          </MemberRouter>
        ),
      },
      {
        path: "member-profile",
        element: (
          <MemberRouter>
            <MemberProfile></MemberProfile>
          </MemberRouter>
        ),
      },

      {
        path: "pending/booking",
        element: <PendingBooking></PendingBooking>,
      },
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "announcement",
        element: <UserMemberAnnounce></UserMemberAnnounce>,
      },
    ],
  },
]);
