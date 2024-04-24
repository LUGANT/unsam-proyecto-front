import { Footer } from "../../../components/footer"
import { Outlet } from "react-router-dom"

export function AuthLayout(){
  return <>
    <Outlet/>
    <Footer/>
  </>
}