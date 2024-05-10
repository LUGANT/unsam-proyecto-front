import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { AuthLayout } from "../pages/layouts/auth-layout";
import { MainLayout } from "../pages/layouts/main-layout";
import NewEventModal from './../components/NewEventModal';
import UserReview from "../components/UserReview";

export function PrincipalRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/auth" element = { <AuthLayout /> }>
            <Route path = "/auth/login" element = { <LoginPage /> }/>
        </Route>
        <Route path = "/" element = { <UserReview /> }>
          <Route path = "/home" element = { < HomePage/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
