import React from "react";
import { Box, Container, Typography } from "@mui/material";

import NavDrawer from "components/nav_drawer/nav_drawer";

interface LayoutProps {
  activeLabel: string;
  direction: string;
}

export function AppLayout(props: React.PropsWithChildren<LayoutProps>): JSX.Element {
  return (
    <Box component="div" sx={{ display: "flex" }}>
      <NavDrawer activeLabel={props.activeLabel} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          variant="h2"
          sx={{ m: 1.5, height: "auto" }}
        >
          {props.activeLabel.toUpperCase()}
        </Typography>
        <Container sx={{ flexGrow: "1", mb: 3 }} maxWidth={false}>
          <Box
            sx={{
              height: "100%",
              maxHeight: "100vh",
              display: "flex",
              flexDirection: props.direction,
              justifyContent: "space-between",
              columnGap: 3,
              rowGap: 3,
            }}
          >
            {props.children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
