import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "../pages/home"
import { LoginPage } from "../pages/login"

export function PrincipalRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path = "/" element = { < HomePage/> }/>
          <Route path = "/login" element = { <LoginPage /> }/>
        </Routes>
    </BrowserRouter>
  )
}