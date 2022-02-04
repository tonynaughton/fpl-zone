import React from "react";
import Drawer from "@mui/material/Drawer";
import Logo from "components/logo/logo";
import { Box } from "@mui/material";
import "./nav_drawer.css";
import { MenuItem } from "./types";
import MenuList from "./menu_list";

const drawerWidth = 250;

const mainMenuItems: MenuItem[] = [
  { id: "gameweek-live", label: "gameweek live", href: "/gameweek-live" },
  { id: "my-team", label: "my team", href: "/gameweek-live" },
  { id: "fix-and-res", label: "fixtures & results", href: "/fixtures-and-results" },
  { id: "analysis", label: "analysis", href: "/analysis" },
  { id: "social", label: "social", href: "/social" },
];

const endMenuItems: MenuItem[] = [
  { id: "logout", label: "logout", href: "/logout" },
  { id: "account", label: "account", href: "/account" },
];

interface NavDrawerProps {
  activeId: string;
}

export default function NavDrawer({ activeId }: NavDrawerProps) {
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
      </Box>
      <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <MenuList items={mainMenuItems} activeId={activeId} />
        <MenuList items={endMenuItems} activeId={activeId} />
      </Box>
    </Drawer>
  );
}
