import React from "react";
import { Box, Typography } from "@mui/material";
import { Warning } from "@mui/icons-material";

interface ErrorProps {
  message: string;
}

export default function Error({ message }: ErrorProps): JSX.Element {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ height: "100%", rowGap: "20px" }}
    >
      <Warning />
      <Typography>{message}</Typography>
    </Box>
  );
}
