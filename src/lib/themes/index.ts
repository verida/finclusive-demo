import { dialogClasses, menuClasses } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        #root {
          height: 100vh;
          width: 100vw;
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
