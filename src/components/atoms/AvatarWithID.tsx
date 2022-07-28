import { Avatar, Paper, Typography } from "@mui/material";
import React from "react";

export type AvatarWithIDProps = {
  imageSrc?: string;
  imageAlt?: string;
  id?: string;
};

export const AvatarWithID: React.FunctionComponent<AvatarWithIDProps> = (
  props
) => {
  const { imageSrc, imageAlt, id } = props;

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          py: 0.5,
          pl: 0.5,
          pr: 1,
          borderRadius: "40px",
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}
          alt={imageAlt}
          src={imageSrc}
        />
        {id && (
          <Typography variant="body2">{`${id.slice(4, 13)}...`}</Typography>
        )}
      </Paper>
    </>
  );
};
