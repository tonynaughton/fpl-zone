import React from "react";
import { Box, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { getLocalImage } from "helpers";

import { AuthModalView } from "components/authentication/auth_modal";

import { GameweekCountdown } from "./gw_countdown";
import { MenuList } from "./menu_list";

interface NavDrawerProps {
  activeId: string;
}

export interface MenuItemType {
  id: string;
  label: string;
  href?: string;
  view?: AuthModalView;
}

export interface MenuItems {
  nav: MenuItemType[];
  auth: MenuItemType[];
}

export const menuItems: MenuItems = {
  nav: [
    { id: "gw-live", label: "gameweek live", href: "/gameweek-live" },
    { id: "my-fpl", label: "my fpl", href: "/my-fpl" },
    { id: "fix-and-res", label: "fixtures & results", href: "/fixtures-and-results" },
    { id: "analysis", label: "analysis", href: "/analysis" }
  ],
  auth: [
    { id: "logout", label: "logout", view: "logout" },
    { id: "account", label: "account", view: "account" },
    { id: "login", label: "login", view: "login" },
    { id: "register", label: "register", view: "register" }
  ]
};

export default function NavDrawer({ activeId }: NavDrawerProps): JSX.Element {
  const theme = useTheme();

  return (
    <Drawer
      anchor='left'
      data-testid='nav-drawer'
      sx={{
        p: 0,
        width: "12vw",
        maxWidth: "15em",
        "& .MuiDrawer-paper": {
          width: "inherit",
          maxWidth: "inherit",
          bgcolor: theme.palette.primary.main,
          borderRight: "2px solid black"
        }
      }}
      variant='permanent'
    >
      <Box
        bgcolor={theme.palette.secondary.main}
        borderBottom='2px solid black'
        className='flex-center'
        flexDirection='column'
        gap={1}
        padding={1}
        width='100%'
      >
        <img alt='fpl-zone-logo' src={getLocalImage("logo.png")} width='100%' />
        <GameweekCountdown />
      </Box>
      <MenuList activeId={activeId} items={menuItems} />
    </Drawer>
  );
}
