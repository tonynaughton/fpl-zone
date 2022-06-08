import React from "react";
import { Box, Container, Typography } from "@mui/material";

import NavDrawer from "components/nav_drawer/nav_drawer";

interface LayoutProps {
  activeLabel: string;
  direction: string;
}

export const AppLayout = (props: React.PropsWithChildren<LayoutProps>): JSX.Element => {
  return (
    <Box component='div' sx={{ display: "flex" }}>
      <NavDrawer activeLabel={props.activeLabel} />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography
          sx={{ p: 1.5 }}
          textAlign='center'
          variant='h1'
        >
          {props.activeLabel.toUpperCase()}
        </Typography>
        <Container maxWidth='xl' sx={{ flexGrow: "1" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: props.direction,
              justifyContent: "space-between",
              columnGap: 3,
              rowGap: 3,
              pb: 2.5
            }}
          >
            {props.children}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
