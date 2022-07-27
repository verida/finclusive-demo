import React from "react";
import { ThemesProvider } from "./ThemesContext";
import { VeridaProvider } from "./VeridaContext";

type Props = {
  children?: React.ReactNode;
};

export const AppContextProvider: React.FunctionComponent<Props> = (props) => {
  return (
    <VeridaProvider>
      <ThemesProvider>{props.children}</ThemesProvider>
    </VeridaProvider>
  );
};
