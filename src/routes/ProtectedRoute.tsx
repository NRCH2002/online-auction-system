import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


type Props = {
  role?: "user" | "admin"; // Optional role requirement
};

const ProtectedRoute = ({ role }: Props) => {

  
  const { user } = useAuth();

  //  If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login"/>;
  }

  // If role is provided but doesn't match → redirect to homepage
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
