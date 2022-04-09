import React from "react";
import Drawer from "@mui/material/Drawer";
import Logo from "components/logo/logo";
import { Box, Typography } from "@mui/material";
import { MenuItem } from "./types";
import MenuList from "./menu_list";
import GameweekCountdown from "./gw_countdown";
import "./nav_drawer.css";

const drawerWidth = 250;

const mainMenuItems: MenuItem[] = [
  { label: "gameweek live", href: "/gameweek-live" },
  { label: "my team", href: "/my-team" },
  { label: "fixtures & results", href: "/fixtures-and-results" },
  { label: "analysis", href: "/analysis" },
  // { label: "social", href: "/social" },
];

const endMenuItems: MenuItem[] = [
  { label: "logout", href: "/logout" },
  { label: "account", href: "/account" },
];

interface NavDrawerProps {
  activeLabel: string;
}

export default function NavDrawer({ activeLabel }: NavDrawerProps): JSX.Element {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        borderRight: "5px solid black",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#16B7EA",
          borderRight: "1px solid black",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box className="logo-container">
        <Logo compact={true} />
        <GameweekCountdown />
      </Box>
      <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <MenuList items={mainMenuItems} activeLabel={activeLabel} />
        <MenuList items={endMenuItems} activeLabel={activeLabel} />
      </Box>
    </Drawer>
  );
}
