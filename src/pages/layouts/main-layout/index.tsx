import { NavBar } from "../../../components/NavBar"
import { Footer } from "../../../components/footer"
import { Outlet } from "react-router-dom"


export function MainLayout(){
  return <>
    <NavBar/>
    <Outlet/>
    <Footer/>
  </>
}