import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "../pages/about";
import { ChangePasswordPage } from "../pages/change-password";
import { NotFound } from "../pages/errors/not-found";
import { PageNotFound } from "../pages/errors/page-not-found";
import { EventoDetail } from "../pages/evento-detail";
import { HomePage } from "../pages/home";
import { AuthLayout } from "../pages/layouts/auth-layout";
import { MainLayout } from "../pages/layouts/main-layout";
import { LoginPage } from "../pages/login";
import { MisEventos } from "../pages/mis-eventos";
import Profile from "../pages/profile/Profile";
import { SearchPage } from "../pages/search";
import { SignUpPage } from "../pages/signup";

export function PrincipalRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mis-eventos" element={<MisEventos />} />
          <Route path="/buscar-eventos/:search" element={<SearchPage />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/profile/change-password"
            element={<ChangePasswordPage />}
          />
          <Route path="/evento/:idEvento" element={<EventoDetail />} />
        </Route>
        <Route path="/404" element={<NotFound />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
