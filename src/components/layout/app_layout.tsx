import React from "react";
import NavDrawer from "components/nav_drawer/nav_drawer";
import { Box, Typography } from "@mui/material";

interface LayoutProps {
  activeLabel: string;
}

export default function AppLayout(props: React.PropsWithChildren<LayoutProps>) {
  return (
    <Box component="div" sx={{ display: "flex" }}>
      <NavDrawer activeLabel={props.activeLabel} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Typography textAlign="center" variant="h3" sx={{ mt: 2, mb: 2 }}>
          {props.activeLabel.toUpperCase()}
        </Typography>
        {props.children}
      </Box>
    </Box>
  );
}
