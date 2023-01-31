import { green, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#f5a700",
      light: "#FFC11A",
      dark: "#DC8E00",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#525953",
      light: "#6C736D",
      dark: "#39403A",
      contrastText: "#242424",
    },
    success: {
      main: green.A200,
    },
    error: {
      main: red.A200,
    },
  },
  spacing: 4,
});

export default theme;
