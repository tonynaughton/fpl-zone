import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { auth, logout } from "config/firebase";
import { getLocalImage } from "helpers";

import { AuthModalView } from "components/layout";

import { GameweekCountdown } from "./gw_countdown";
import { MenuList } from "./menu_list";

interface NavDrawerProps {
  active: string;
  openAuthModal: (value: AuthModalView) => void;
}

export interface MenuItems {
  nav: { label: string; href: string }[];
  auth: { label: string; onItemClick: () => void }[];
}

export default function NavDrawer({ active, openAuthModal }: NavDrawerProps): JSX.Element {
  const [user, loading] = useAuthState(auth);

  if (loading) return <></>;

  const menuItems: MenuItems = {
    nav: [
      { label: "gameweek live", href: "/gameweek-live" },
      { label: "my fpl", href: "/my-fpl" },
      { label: "fixtures & results", href: "/fixtures-and-results" },
      { label: "analysis", href: "/analysis" }
    ],
    auth: user
      ? [
        { label: "logout", onItemClick: () => logout() },
        { label: "account", onItemClick: () => openAuthModal(AuthModalView.Account) }
      ]
      : [
        { label: "login", onItemClick: () => openAuthModal(AuthModalView.Login) },
        { label: "register", onItemClick: () => openAuthModal(AuthModalView.Register) }
      ]
  };

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
        // ZIndex: 0
      }}
      variant='permanent'
    >
      <Box
        borderBottom='1px solid black'
        className='flex-center'
        gap={1}
        padding='1vh'
        sx={{ backgroundColor: "#5fdd6b" }}
      >
        <img alt='fpl-zone-logo' src={getLocalImage("logo.png")} width='100%' />
        <GameweekCountdown />
      </Box>
      <MenuList active={active} items={menuItems} />
    </Drawer>
  );
}
