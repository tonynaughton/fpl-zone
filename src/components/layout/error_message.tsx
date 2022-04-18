import React from "react";
import { Box, Typography } from "@mui/material";
import { Warning } from "@mui/icons-material";

interface ErrorProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorProps): JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ rowGap: "2em" }}
    >
      <Typography variant="body1">{message}</Typography>
      <Warning sx={{ fontSize: "5vh" }} />
    </Box>
  );
}
