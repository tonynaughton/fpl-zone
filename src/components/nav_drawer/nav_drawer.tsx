import React from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";

import GameweekCountdown from "./gw_countdown";
import MenuList from "./menu_list";
import { MenuItem } from "./types";

const mainMenuItems: MenuItem[] = [
  { label: "gameweek live", href: "/gameweek-live" },
  { label: "my fpl", href: "/my-fpl" },
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
  const drawerWidth = "12vw";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          rowGap: 1,
          p: "1vh",
          backgroundColor: "#5fdd6b",
          borderBottom: "1px solid black"
        }}
      >
        <img alt='fpl-zone-logo' src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} width='100%' />
        <GameweekCountdown />
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='space-between'
        width='100%'
      >
        <MenuList activeLabel={activeLabel} items={mainMenuItems} />
        <MenuList activeLabel={activeLabel} items={endMenuItems} />
      </Box>
    </Drawer>
  );
}
