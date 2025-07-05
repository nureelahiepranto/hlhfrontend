import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const PrivateRoute = ({ roles, children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Simulate authentication state loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); // Small delay to let useEffect in AuthContext run
  }, []);

  if (loading) return <p>Loading...</p>; // Show a loading message

  // If user is not logged in, redirect to login
  if (!user) return <Navigate to="/" replace />;

  // If user role is not allowed, redirect to unauthorized page
  if (!roles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default PrivateRoute;
