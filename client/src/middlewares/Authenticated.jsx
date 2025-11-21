import { Navigate } from "react-router";

import  useAuth  from "../hooks/useAuth.jsx";

function Authenticated({ children }) {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) return <Navigate to="/sign-in" replace />;

  return children;
}

export default Authenticated;
