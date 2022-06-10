import React from "react";
import { Box, Container } from "@mui/material";

import NavDrawer from "components/nav_drawer/nav_drawer";

interface LayoutProps {
  activeLabel: string;
  direction: string;
}

export const AppLayout = ({ activeLabel, direction, children }: React.PropsWithChildren<LayoutProps>): JSX.Element => {
  return (
    <Box component='div' sx={{ display: "flex" }}>
      <NavDrawer activeLabel={activeLabel} />
      <Container
        component='main'
        disableGutters
        maxWidth={false}
        sx={{
          p: 3,
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: direction,
          justifyContent: "space-between",
          columnGap: 3,
          rowGap: 3
        }}
      >
        {children}
      </Container>
    </Box>
  );
};
