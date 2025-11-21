import { Navigate } from "react-router";

import useAuth from "../hooks/useAuth";

function Guest({ children }) {
  const { loggedInUser } = useAuth();

  if (loggedInUser) return <Navigate to="/dashboard" replace />;

  return children;
}

export default Guest;
