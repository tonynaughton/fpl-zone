import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Logo from "components/logo/logo";
import { Box, Grid } from "@mui/material";
import "./nav_drawer.css";
import { MenuItem } from "./types";
import MenuList from "./menu_list";

const drawerWidth = 250;

const mainMenuItems: MenuItem[] = [
  { label: "gameweek live", href: "/gameweek-live" },
  { label: "my team", href: "/gameweek-live" },
  { label: "fixtures & results", href: "/fixtures-and-results" },
  { label: "analysis", href: "/analysis" },
  { label: "social", href: "/social" },
];

const endMenuItems: MenuItem[] = [
  { label: "account", href: "/account" },
  { label: "logout", href: "/logout" },
];

export default function NavDrawer() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#16B7EA",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Grid container className="logo-container">
        <Grid item>
          <Logo compact={true} />
        </Grid>
      </Grid>
      <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <MenuList items={mainMenuItems} />
        <MenuList items={endMenuItems} />
      </Box>
    </Drawer>
  );
}
