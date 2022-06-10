import React from "react";
import { Warning } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingMessageProps {
  type?: string;
  message?: string;
}

export const Notifier = ({ type, message }: LoadingMessageProps): JSX.Element => {
  const renderIcon = (): JSX.Element => {
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

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      maxWidth='80%'
      sx={{ rowGap: "3vh" }}
    >
      {renderIcon()}
      <Typography textAlign='center'>{message || "Loading.."}</Typography>
    </Box>
  );
};
