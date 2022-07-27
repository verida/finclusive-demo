import React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { theme } from "lib/themes";

type ThemesProviderType = {
  children?: React.ReactNode;
};

export const ThemesProvider: React.FunctionComponent<ThemesProviderType> = (
  props
) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StyledEngineProvider>
  );
};
