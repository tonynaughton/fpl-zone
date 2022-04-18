import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";

interface ComponentContainerProps {
  title: string;
  isLoading?: boolean;
  error?: unknown;
  children: JSX.Element;
}

export function ComponentContainer({
  title,
  isLoading,
  error,
  children,
}: ComponentContainerProps): JSX.Element {
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
          sx={{ height: "100%" }}
        >
          <Typography fontSize={20}>Fetching data..</Typography>
          <CircularProgress />
        </Grid>
      );
    } else if (error) {
      return <Typography>Error fetching data: {error}</Typography>;
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
