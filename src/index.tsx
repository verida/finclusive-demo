import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "lib/contexts";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </AppContextProvider>
  </React.StrictMode>
);
