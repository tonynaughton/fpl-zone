import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";

interface ComponentContainerProps {
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  children: JSX.Element;
}

export default function ComponentContainer({
  title,
  isLoading,
  isError,
  children,
}: ComponentContainerProps) {
  const renderChildren = (): JSX.Element => {
    if (isLoading) {
      return (
        <Grid
          container
          display="flex"
          alignItems="center"
          direction="column"
          justifyContent="center"
          rowGap={2}
        >
          <Typography fontSize={20}>Fetching data..</Typography>
          <CircularProgress />
        </Grid>
      );
    } else if (isError) {
      return <Typography>Error fetching data!</Typography>;
    } else {
      return children;
    }
  };

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
      <Box>{renderChildren()}</Box>
    </Box>
  );
}
