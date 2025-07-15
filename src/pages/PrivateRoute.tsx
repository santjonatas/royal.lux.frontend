import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    console.log("Renderizando PrivateRoute");
    
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
}