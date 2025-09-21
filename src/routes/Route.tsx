import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import PublicLayout from "../pages/public/PublicLayout";

// User Pages
import UserLayout from "../pages/user/UserLayout";
import Dashboard from "../pages/user/Dashboard";
import CreateAuction from "../pages/user/CreateAuction";
import MyAuctions from "../pages/user/MyAuctions";
import MyBids from "../pages/user/MyBids";
import MyPayments from "../pages/user/MyPayments";
import Notifications from "../pages/user/Notifications";
import Profile from "../pages/user/Profile";

// Admin Pages
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageAuctions from "../pages/admin/ManageAuctions";
import ManageBids from "../pages/admin/ManageBids";
import ManageUsers from "../pages/admin/ManageUsers";

export const Routes = () => {

  const router = createBrowserRouter([
    // Public Routes
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { path: "/", element: <Home /> },
         { path: "/home", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },

    // User Protected Routes
    {
      element: <ProtectedRoute role="user" />,
      children: [
        {
          path: "/user",
          element: <UserLayout />,
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "auction", element: <CreateAuction /> },
            { path: "myauction", element: <MyAuctions /> },
            { path: "mybids", element: <MyBids /> },
            { path: "mypayments", element: <MyPayments /> },
            { path: "notifications", element: <Notifications /> },
            { path: "profile", element: <Profile /> },
          ],
        },
      ],
    },

    // Admin Protected Routes
    {
      element: <ProtectedRoute role="admin" />,
      children: [
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "auction", element: <ManageAuctions /> },
            { path: "bids", element: <ManageBids /> },
            { path: "users", element: <ManageUsers /> },
            { path: "notifications", element: <Notifications /> },
            { path: "profile", element: <Profile /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
