import React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";

import Logo from "components/logo/logo";

import GameweekCountdown from "./gw_countdown";
import MenuList from "./menu_list";
import { MenuItem } from "./types";

import "./nav_drawer.css";

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
  const drawerWidth = '11vw';

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
      variant='permanent'
      anchor='left'
    >
      <Box className='logo-container' sx={{ pt: '1.5vh', pb: '1.5vh' }}>
        <Logo compactLogo />
        <GameweekCountdown />
      </Box>
      <Box height='100%' display='flex' flexDirection='column' justifyContent='space-between'>
        <MenuList items={mainMenuItems} activeLabel={activeLabel} />
        <MenuList items={endMenuItems} activeLabel={activeLabel} />
      </Box>
    </Drawer>
  );
}
