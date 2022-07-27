import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
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
  },
});
