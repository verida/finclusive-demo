import React from "react";
import { Profile } from "components/organisms";
import { Box, Paper } from "@mui/material";

export const HomeView: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 2,
      }}
    >
      <Paper elevation={4} sx={{ width: "100%" }}>
        <Profile />
      </Paper>
    </Box>
  );
};
