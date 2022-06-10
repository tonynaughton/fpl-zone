import React from "react";
import { Box, Typography } from "@mui/material";

interface ComponentContainerProps {
  title: string;
  isLoading?: boolean;
  error?: string;
  children: JSX.Element;
}

export const ComponentContainer = ({
  title,
  children
}: ComponentContainerProps): JSX.Element => {

  return (
    <Box
      border='2px solid black'
      sx={{ boxShadow: 4, position: "relative", height: "100%" }}
      width='100%'
    >
      <Box
        sx={{
          zIndex: "fab",
          backgroundColor: "#16B7EA",
          color: "#F9F9F9",
          p: 0.8,
          position: "absolute",
          top: 0,
          left: 0,
          borderBottom: "2px solid black",
          borderRight: "2px solid black",
          maxWidth: "15vw",
          width: "auto"
        }}
      >
        <Typography
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            width: "100%",
            whiteSpace: "nowrap"
          }}
          variant='h3'
        >{title.toUpperCase()}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};
