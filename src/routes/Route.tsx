import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login";
import Signup from "../components/Signup";

// User Pages
import Dashboard from "../components/user/Dashboard";
import CreateAuction from "../components/user/CreateAuction";
import MyAuctions from "../components/user/MyAuctions";
import MyBids from "../components/user/MyBids";
import MyPayments from "../components/user/MyPayments";
import Notifications from "../components/user/Notifications";
import Profile from "../components/Profile";

// Admin Pages
import AdminDashboard from "../components/admin/AdminDashboard";
import ManageAuctions from "../components/admin/ManageAuctions";
import ManageBids from "../components/admin/ManageBids";
import ManageUsers from "../components/admin/ManageUsers";
import RootLayout from "../components/RootLayout";
import ViewAuction from "../components/user/ViewAuction";
import NotFound from "../components/errors/NotFound";

export const Routes = () => {

  const router = createBrowserRouter([
    // Public Routes
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <Dashboard /> },
         { path: "/dashboard", element: <Dashboard/> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
        {path: "/viewauction", element: <ViewAuction /> }
      ],
    },

    // User Protected Routes
    {
      element: <ProtectedRoute role="user" />,
      children: [
        {
          path: "/user",
          element: <RootLayout />,
          children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "createauction", element: <CreateAuction /> },
            { path: "myauction", element: <MyAuctions /> },
            { path: "mybids", element: <MyBids /> },
            { path: "mypayments", element: <MyPayments /> },
            { path: "notifications", element: <Notifications /> },
            { path: "profile", element: <Profile /> },
            {path: "viewauction", element: <ViewAuction />}
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
          element: <RootLayout />,
          children: [
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "manageauction", element: <ManageAuctions /> },
            { path: "managebids", element: <ManageBids /> },
            { path: "manageusers", element: <ManageUsers /> },
            { path: "notifications", element: <Notifications /> },
            { path: "profile", element: <Profile /> },
          ],
        },
      ],
    },
     {
    path: "*",
    element: <NotFound />,
  },
  ]);

  return <RouterProvider router={router} />;
};
