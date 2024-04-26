import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./components/theme/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider cssVarsRoot={undefined} theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
