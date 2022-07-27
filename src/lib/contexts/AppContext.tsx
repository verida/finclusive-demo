import React from "react";
import { VeridaProvider } from "./VeridaContext";

type Props = {
  children?: React.ReactNode;
};

export const AppContextProvider: React.FunctionComponent<Props> = (props) => {
  return <VeridaProvider>{props.children}</VeridaProvider>;
};
