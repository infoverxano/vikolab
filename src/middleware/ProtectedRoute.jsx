import { Navigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import { Loader } from "@mantine/core";

export default function ProtectedRoute({ children, roles }) {

  
  const { user,role, loading } = useAuth();
  console.log(role);

  // if (loading) return <div>Loading...</div>;
  if (loading) return <div className="flex items-center justify-center"><Loader color="blue" /></div>;
  // not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  // role check
  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}