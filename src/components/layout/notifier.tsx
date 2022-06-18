import React from "react";
import { Warning } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingMessageProps {
  type?: string;
  message?: string;
}

export const DEFAULT_NOTIFIER_MESSAGE = "Loading..";

export const Notifier = ({ type, message }: LoadingMessageProps): JSX.Element => {
  const renderIcon = (): JSX.Element => {
    const iconStyle = {
      fontSize: "3vw",
      color: "black"
    };

    switch (type) {
    case "error":
      return <Warning data-testid='error-icon' sx={iconStyle} />;
    case "warning":
      return <Warning data-testid='warning-icon' sx={iconStyle} />;
    case "loading":
      return <CircularProgress data-testid='loading-icon' sx={iconStyle} />;
    default:
      return <CircularProgress data-testid='default-icon' sx={iconStyle} />;
    }
  };

  return (
    <Box
      alignItems='center'
      data-testid='notifier'
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='center'
      margin='auto'
      sx={{ rowGap: "3vh" }}
      width='80%'
    >
      {renderIcon()}
      <Typography textAlign='center'>{message || DEFAULT_NOTIFIER_MESSAGE}</Typography>
    </Box>
  );
};
