import { Box, Typography } from "@mui/material";
import React from "react";

interface ComponentContainerProps {
  title: string;
  children: JSX.Element;
}

export default function ComponentContainer({ title, children }: ComponentContainerProps) {
  return (
    <Box
      width="100%"
      border="2px solid black"
      padding={3}
      sx={{ boxShadow: 4, position: "relative" }}
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
        <Typography fontSize={18}>{title.toUpperCase()}</Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}
