import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { TopBar } from "components/organisms";

const TopBarOffset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const App: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TopBar />
      <TopBarOffset />
      <Box component="main" sx={{ flexGrow: 1 }}></Box>
    </Box>
  );
};
