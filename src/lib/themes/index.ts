import { dialogClasses, menuClasses } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#006a65",
      dark: "#004a46",
      light: "#338783",
    },
    secondary: {
      main: "#4a6361",
      dark: "#334543",
      light: "#6e8280",
    },
    error: {
      main: "#ba1a1a",
      dark: "#821212",
      light: "#c74747",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        #root {
          height: 100vh;
          width: 100vw;
          background: radial-gradient(circle, rgba(210,210,246,0.4) 0%, rgba(209,246,242,0.3) 100%);
        }
      `,
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          [`& .${dialogClasses.paper}`]: {
            backgroundImage: "none",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          [`& .${menuClasses.paper}`]: {
            backgroundImage: "none",
          },
        },
      },
    },
  },
});
