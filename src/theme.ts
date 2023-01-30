import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#f5a700",
      light: "#ffe137",
      contrastText: "#ffffffde",
    },
    secondary: {
      main: "#525953",
      contrastText: "#242424",
    },
    error: {
      main: red.A700,
    },
  },
  spacing: 4,
});

export default theme;
