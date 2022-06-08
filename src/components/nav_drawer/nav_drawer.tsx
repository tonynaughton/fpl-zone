import React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";

import GameweekCountdown from "./gw_countdown";
import MenuList from "./menu_list";
import { MenuItem } from "./types";

import "./nav_drawer.css";

const mainMenuItems: MenuItem[] = [
  { label: "gameweek live", href: "/gameweek-live" },
  { label: "my team", href: "/my-team" },
  { label: "fixtures & results", href: "/fixtures-and-results" },
  { label: "analysis", href: "/analysis" }
];

const endMenuItems: MenuItem[] = [
  { label: "logout", href: "/logout" },
  { label: "account", href: "/account" }
];

interface NavDrawerProps {
  activeLabel: string;
}

export default function NavDrawer({ activeLabel }: NavDrawerProps): JSX.Element {
  const drawerWidth = "11vw";

  return (
    <Drawer
      anchor='left'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        borderRight: "5px solid black",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#16B7EA",
          borderRight: "1px solid black"
        }
      }}
      variant='permanent'
    >
      <Box className='logo-container' sx={{ p: "1vh" }}>
        <img alt='fpl-zone-logo' src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} width='100%' />
        <GameweekCountdown />
      </Box>
      <Box display='flex' flexDirection='column' height='100%' justifyContent='space-between'>
        <MenuList activeLabel={activeLabel} items={mainMenuItems} />
        <MenuList activeLabel={activeLabel} items={endMenuItems} />
      </Box>
    </Drawer>
  );
}
