import React from "react";
import { Button, ButtonProps, styled } from "@mui/material";
import { ReactComponent as VeridaLogo } from "./verida_logo.svg";

const WhiteButton = styled(Button)<ButtonProps>(({ theme }) => ({
  "color": theme.palette.getContrastText(theme.palette.common.white),
  "backgroundColor": theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.grey[200],
  },
}));

interface Props {
  onClick: () => void;
  isConnecting: boolean;
}

export const ConnectVeridaButton: React.FunctionComponent<Props> = ({
  onClick,
  isConnecting,
}) => {
  return (
    <WhiteButton
      onClick={onClick}
      disabled={isConnecting}
      variant="contained"
      endIcon={<VeridaLogo height={34} width={100} />}
    >
      {isConnecting ? `Connecting...` : `Connect with`}
    </WhiteButton>
  );
};
