import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { theme } from "./components/theme/index.tsx";
import { AuthProvider } from "./providers/auth/AuthContext.tsx";
import { EventProvider } from "./providers/events/EventContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider cssVarsRoot={undefined} theme={theme}>
      <EventProvider>
        <AuthProvider>
          <Container
            minHeight={"100vh"}
            maxW={"none"}
            m={0}
            p={0}
            display={"flex"}
            flexDirection={"column"}
          >
            <App />
          </Container>
        </AuthProvider>
      </EventProvider>
    </ChakraProvider>
  </React.StrictMode>
);
