import React from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { KeyboardArrowDown as ArrowDownIcon } from "@mui/icons-material";

export const SwapBox: React.FunctionComponent = () => {
  return (
    <Paper sx={{ width: "100%" }} elevation={8}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        <Box>
          <Typography component="h2" variant="h5">
            Swap
          </Typography>
        </Box>
        <Box component="form" noValidate autoComplete="off">
          <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 1 }}>
            <TextField
              label="Provide"
              variant="outlined"
              size="medium"
              defaultValue={0}
              placeholder="0.00"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              select
              variant="outlined"
              size="medium"
              defaultValue="USDC"
            >
              <MenuItem key="ETH" value="ETH">
                ETH
              </MenuItem>
              <MenuItem key="USDC" value="USDC">
                USDC
              </MenuItem>
            </TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", m: 0, p: 0 }}>
            <ArrowDownIcon />
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 1, mb: 2 }}>
            <TextField
              label="Receive"
              variant="outlined"
              size="medium"
              defaultValue={0}
              placeholder="0.00"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              select
              variant="outlined"
              size="medium"
              defaultValue="ETH"
            >
              <MenuItem key="ETH" value="ETH">
                ETH
              </MenuItem>
              <MenuItem key="USDC" value="USDC">
                USDC
              </MenuItem>
            </TextField>
          </Box>
          <Button variant="contained" size="large" sx={{ width: "100%" }}>
            Connect Wallet
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
