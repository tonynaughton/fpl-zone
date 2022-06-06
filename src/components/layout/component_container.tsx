import React from "react";
import { Box, Typography } from "@mui/material";

import { Notifier } from "./notifier";

interface ComponentContainerProps {
  title: string;
  isLoading?: boolean;
  error?: string;
  children: JSX.Element;
}

export function ComponentContainer({
  title,
  children,
  isLoading,
  error,
}: ComponentContainerProps): JSX.Element {
  const renderChildren = (): JSX.Element => {
    if (isLoading) {
      return (
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
        >
          <Notifier />
        </Box>
      );
    } else if (error) {
      return (
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
        >
          <Notifier type='error' message={error} />
        </Box>
      );
    } else {
      return children;
    }
  };
  return (
    <Box
      width="100%"
      border="2px solid black"
      sx={{ boxShadow: 4, position: "relative", height: "100%" }}
    >
      <Box
        sx={{
          zIndex: "tooltip",
          backgroundColor: "#16B7EA",
          color: "#F9F9F9",
          p: 1,
          position: "absolute",
          top: 0,
          left: 0,
          borderBottom: "2px solid black",
          borderRight: "2px solid black",
          height: "auto",
        }}
      >
        <Typography variant="h3">{title.toUpperCase()}</Typography>
      </Box>
      {renderChildren()}
    </Box>
  );
}
