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
    break;
  case "error":
    return <Warning sx={iconStyle} />;
    break;
  case "warning":
    return <Warning sx={iconStyle} />;
    break;
  default:
    return <Warning sx={iconStyle} />;
    break;
  }
};

export const Notifier = ({ type, message }: LoadingMessageProps): JSX.Element => {
  return (
    <Box
      maxWidth='80%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      sx={{ rowGap: "3vh" }}
    >
      {type ? renderIcon(type) : renderIcon("loading")}
      <Typography variant='body1' textAlign='center'>{message || "Loading.."}</Typography>
    </Box>
  );
};
