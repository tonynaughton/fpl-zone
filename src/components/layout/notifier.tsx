import React from "react";
import { Warning } from "@mui/icons-material";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

export type NotifierType = "loading" | "warning" | "error";

interface LoadingMessageProps {
  type?: NotifierType;
  message?: string;
}

export const notifierMessageMap = {
  gameUpdating: "Game is updating..",
  seasonNotStarted: "This data will be available once the season has started",
  seasonFinished: "The current FPL season has finished, check back next season!",
  loading: "Loading...",
  fplIdLoginRequired: "You must login with your FPL ID to view this data",
  fplIdRequired: "A valid FPL ID is required to view this data - please add one to your account",
  teamDataFetchError: "Error getting your team data",
  teamPicksFetchError: "Error getting your team picks",
  fetching: "Fetching data.."
};

export const Notifier = ({ type = "loading", message = "Loading..." }: LoadingMessageProps): JSX.Element => {
  const theme = useTheme();

  const NotifierIcon = (): JSX.Element => {
    const iconStyle = {
      fontSize: theme.typography.h3,
      color: "black"
    };

    // eslint-disable-next-line default-case
    switch (type) {
    case "error":
      return <Warning data-testid='error-icon' sx={iconStyle} />;
    case "warning":
      return <Warning data-testid='warning-icon' sx={iconStyle} />;
    case "loading":
      return <CircularProgress data-testid='loading-icon' sx={iconStyle} />;
    }
  };

  return (
    <Box
      className='flex-center'
      data-testid='notifier'
      flexDirection='column'
      gap={2}
      height='80%'
      margin='auto'
      width='80%'
    >
      <NotifierIcon />
      <Typography textAlign='center'>{message}</Typography>
    </Box>
  );
};
