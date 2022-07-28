import React from "react";
import { SwapBox } from "components/organisms";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "lib/constants";
import { useVerida } from "lib/hooks";

export const HomeView: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { isConnected } = useVerida();

  const handleKYCAlertMoreClick = () => {
    navigate(routes.profile);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {isConnected && (
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleKYCAlertMoreClick}
            >
              More
            </Button>
          }
        >
          Provide a KYC to unlock you swap volume.
        </Alert>
      )}
      <SwapBox />
      <Typography variant="caption">For demo purpose only</Typography>
    </Box>
  );
};
