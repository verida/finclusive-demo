import React from "react";
import { Button } from "@mui/material";
import { AppDialog } from "components/molecules";
import { Profile } from "components/organisms";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ProfileDialog: React.FunctionComponent<Props> = ({
  open = false,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <AppDialog
      title={"Profile"}
      open={open}
      onClose={onClose}
      actions={<Button onClick={handleClose}>Close</Button>}
    >
      <Profile />
    </AppDialog>
  );
};
