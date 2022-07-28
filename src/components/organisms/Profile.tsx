import React from "react";
import {
  Avatar,
  Box,
  Button,
  Typography,
  useTheme,
  Link,
  Alert,
} from "@mui/material";
import { EnvironmentType } from "@verida/client-ts";
import { useVerida } from "lib/hooks";
import { ConnectVeridaButton } from "components/atoms";
import { config } from "config";

export const Profile: React.FunctionComponent = () => {
  const { connect, disconnect, profile, isConnected, isConnecting } =
    useVerida();
  const theme = useTheme();

  const handleConnect = async () => {
    await connect();
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  const salutation = (
    <>
      Hi <strong>{profile?.name}</strong>
    </>
  );

  const connectedMessage = (
    <>
      You are connected with your <strong>Verida</strong> account
    </>
  );

  const privacyMessage = (
    <>
      We respect your privacy and your personal information. To provide you with
      the best experience, we partnered with <strong>Verida</strong>, a protocol
      allowing users to control their identity and their data. Check{" "}
      <Link
        href="https://www.verida.io"
        underline="hover"
        target="_blank"
        rel="noopener"
      >
        verida.io
      </Link>
      .
    </>
  );

  const notConnectedEnvMessage = (
    <>
      You will be using the <strong>{config.veridaEnv}</strong> environment
    </>
  );

  const connectedEnvMessage = (
    <>
      You are using the <strong>{config.veridaEnv}</strong> environment
    </>
  );

  const disconnectButtonLabel = <>Disconnect</>;

  const veridaEnvironmentAlert =
    config.veridaEnv === EnvironmentType.MAINNET ? null : (
      <Alert
        variant="outlined"
        severity="warning"
        sx={{ alignSelf: "stretch" }}
      >
        {isConnected ? connectedEnvMessage : notConnectedEnvMessage}
      </Alert>
    );

  return (
    <Box
      sx={{
        px: 3,
        pb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(5),
      }}
    >
      <Avatar
        alt={profile?.name}
        src={profile?.avatar}
        sx={{ width: 128, height: 128 }}
      ></Avatar>
      <Typography component="h3" variant="h5">
        {salutation}
      </Typography>
      {isConnected ? (
        <>
          <Box sx={{ alignSelf: "stretch" }}>
            <Typography>{connectedMessage}</Typography>
            <Typography variant="body2">{profile?.id}</Typography>
          </Box>
          {veridaEnvironmentAlert}
          <Button variant="contained" onClick={() => void handleDisconnect()}>
            {disconnectButtonLabel}
          </Button>
        </>
      ) : (
        <>
          {veridaEnvironmentAlert}
          <ConnectVeridaButton
            onClick={() => void handleConnect()}
            isConnecting={isConnecting}
          />
        </>
      )}
      <Typography sx={{ alignSelf: "stretch" }}>{privacyMessage}</Typography>
    </Box>
  );
};
