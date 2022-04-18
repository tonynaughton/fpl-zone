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
      sx={{ rowGap: "2em" }}
    >
      <Typography variant="body1">{message}</Typography>
      <CircularProgress sx={{ color: "black" }} />
    </Box>
  );
}
