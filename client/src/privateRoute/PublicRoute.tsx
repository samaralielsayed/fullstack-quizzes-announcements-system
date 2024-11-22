import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface PrivateRouteProps {
  children: React.ReactNode;
  redirectTo: string;
}

const PublicRoute: React.FC<PrivateRouteProps> = ({ children, redirectTo }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
