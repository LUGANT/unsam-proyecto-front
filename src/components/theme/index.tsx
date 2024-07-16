// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      50: "#eae2ff",
      100: "#c1b2ff",
      200: "#9781ff",
      300: "#6200E8", // color existente
      400: "#5400c4",
      500: "#43009e",
      600: "#320077",
      700: "#230050",
      800: "#140028",
      900: "#050000",
    },
  },
});
