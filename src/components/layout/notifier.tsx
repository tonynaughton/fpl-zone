import React from "react";
import { Error, Warning } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";

export type NotifierType = "loading" | "warning" | "error";

interface LoadingMessageProps {
  type?: NotifierType;
  message?: string;
}

export const Notifier = ({ type = "loading", message = "Loading..." }: LoadingMessageProps): JSX.Element => {
  const NotifierIcon = (): JSX.Element => {
    switch (type) {
    case "error":
      return <Error data-testid='error-icon' fontSize='large' />;
    case "warning":
      return <Warning data-testid='warning-icon' fontSize='large' />;
    case "loading":
      return <CircularProgress color='inherit' data-testid='loading-icon' />;
    default:
      return <Warning data-testid='error-icon' fontSize='large' />;
    }
  };

  return (
    <Box
      className='flex-center'
      data-testid='notifier'
      flexDirection='column'
      gap={2}
      height='100%'
      p={4}
    >
      <NotifierIcon />
      <Typography textAlign='center'>{message}</Typography>
    </Box>
  );
};
