import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { theme } from "./components/theme/index.tsx";
import { AuthProvider } from "./providers/auth/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider cssVarsRoot={undefined} theme={theme}>
      <AuthProvider>
        <Container minHeight={"100vh"} maxW={"none"} m={0} p={0}>
          <App />
        </Container>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
