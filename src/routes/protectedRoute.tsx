import { useAccordion } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth/AuthContext";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />}</>;
};
