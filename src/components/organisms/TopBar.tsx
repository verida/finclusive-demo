import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { config } from "config";

export const TopBar: React.FunctionComponent = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: `transparent`,
        color: `text.primary`,
      }}
      elevation={0}
    >
      <Toolbar>
        <Typography
          component="h1"
          variant="h6"
          sx={{
            flexGrow: 1,
          }}
        >
          {config.appTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
