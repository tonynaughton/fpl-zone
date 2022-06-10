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
    case "error":
      return <Warning sx={iconStyle} />;
    case "warning":
      return <Warning sx={iconStyle} />;
    case "loading":
      return <CircularProgress sx={iconStyle} />;
    default:
      return <CircularProgress sx={iconStyle} />;
    }
  };

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='center'
      margin='auto'
      sx={{ rowGap: "3vh" }}
      width='80%'
    >
      {renderIcon()}
      <Typography textAlign='center'>{message || "Loading.."}</Typography>
    </Box>
  );
};
