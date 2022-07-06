import React from "react";
import { Warning } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";

export enum NotifierType {
  Error,
  Warning,
  Loading,
}
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

export const DEFAULT_NOTIFIER_MESSAGE = "Loading..";

export const Notifier = ({ type, message }: LoadingMessageProps): JSX.Element => {
  const NotifierIcon = (): JSX.Element => {
    const iconStyle = {
      fontSize: "3vw",
      color: "black"
    };

    switch (type) {
    case NotifierType.Error:
      return <Warning data-testid='error-icon' sx={iconStyle} />;
    case NotifierType.Warning:
      return <Warning data-testid='warning-icon' sx={iconStyle} />;
    case NotifierType.Loading:
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
      gap='3vh'
      height='100%'
      justifyContent='center'
      margin='auto'
      width='80%'
    >
      <NotifierIcon />
      <Typography textAlign='center'>{message || DEFAULT_NOTIFIER_MESSAGE}</Typography>
    </Box>
  );
};
