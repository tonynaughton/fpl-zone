import React from "react";
import NavDrawer from "components/nav_drawer/nav_drawer";
import { Box } from "@mui/material";

interface LayoutProps {
  active: string;
}

export default function Layout(props: React.PropsWithChildren<LayoutProps>) {
  return (
    <Box component="div" sx={{ display: "flex" }}>
      <NavDrawer activeId={props.active} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {props.children}
      </Box>
    </Box>
  );
}
