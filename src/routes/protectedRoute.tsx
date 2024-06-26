import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return <>{isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />}</>;
};
