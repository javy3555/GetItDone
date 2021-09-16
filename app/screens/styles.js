import { extendTheme } from "native-base";
const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#e3e8ff",
      100: "#b2baff",
      200: "#7f8cff",
      300: "#4d5eff",
      400: "#1d30fe",
      500: "#4d5eff",
      600: "#0011b3",
      700: "#000c81",
      800: "#000650",
      900: "#000120",
    },
    orange: {
      700: "#fed7aa",
    },
    green: {
      700: "#bbf7d0",
    },
    red: {
      700: "#fecaca",
    },
    // Redefinig only one shade, rest of the color will remain same.
  },
});

export default theme;
