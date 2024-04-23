import { Box } from "@chakra-ui/react"
import { LoginForm } from "../../components/login-form"

export const LoginPage = () => {
  return <Box display="flex" justifyContent="center" alignItems="center" 
              width={"100vw"} height={"80vh"}>
    <LoginForm/>
  </Box>
}