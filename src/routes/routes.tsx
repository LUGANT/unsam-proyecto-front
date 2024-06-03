import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { AuthLayout } from "../pages/layouts/auth-layout";
import { MainLayout } from "../pages/layouts/main-layout";
import { SignUpPage } from "../pages/signup";
import { NotFound } from "../pages/errors/not-found";
import { MisEventos } from "../pages/mis-eventos";
import { PageNotFound } from "../pages/errors/page-not-found";
import { Search } from "../pages/search";
import { useAuth } from "../providers/auth/AuthContext";
import { useEffect } from "react";
import { EventoDetail } from "../pages/evento-detail";

export function PrincipalRoutes() {
  const { login } = useAuth();
  useEffect(() => {
    login("1");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/mis-eventos" element={<MisEventos />} />
          <Route path="/buscar-eventos/:search" element={<Search />}></Route>
          <Route path="/evento/:idEvento" element={<EventoDetail />}></Route>
        </Route>
        <Route path="/404" element={<NotFound />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
