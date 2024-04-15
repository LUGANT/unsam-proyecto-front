import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage } from "@/pages/login"
import { Home } from "@/pages"

export function PrincipalRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/" element = { < Home/> }/>
          <Route path = "/login" element = { <LoginPage /> }/>
        </Routes>
    </BrowserRouter>
  )
}