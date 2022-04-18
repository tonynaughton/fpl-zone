import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingMessageProps {
  message: string;
}

export function LoadingMessage({ message }: LoadingMessageProps): JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ height: "100%", rowGap: "20px" }}
    >
      <Typography>{message}</Typography>
      <CircularProgress />
    </Box>
  );
}
