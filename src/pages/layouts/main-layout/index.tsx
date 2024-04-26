import { Outlet } from "react-router-dom";
import { NavBar } from "../../../components/NavBar";
import { Footer } from "../../../components/footer";

export function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
