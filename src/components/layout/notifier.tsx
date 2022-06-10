import React from "react";
import { Warning } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingMessageProps {
  type?: string;
  message?: string;
}

const renderIcon = (type: string): JSX.Element => {
  const iconStyle = {
    fontSize: "3vw",
    color: "black"
  };

  switch (type) {
  case "loading":
    return <CircularProgress sx={iconStyle} />;
  case "error":
    return <Warning sx={iconStyle} />;
  case "warning":
    return <Warning sx={iconStyle} />;
  default:
    return <Warning sx={iconStyle} />;
  }
};

export const Notifier = ({ type, message }: LoadingMessageProps): JSX.Element => {
  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      maxWidth='80%'
      sx={{ rowGap: "3vh" }}
    >
      {type ? renderIcon(type) : renderIcon("loading")}
      <Typography textAlign='center'>{message || "Loading.."}</Typography>
    </Box>
  );
};
