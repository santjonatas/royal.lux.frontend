import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { getValidAuthToken } from "../utils/authUtils";

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  console.log("Renderizando PrivateRoute");

  const authToken = getValidAuthToken(); 

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
