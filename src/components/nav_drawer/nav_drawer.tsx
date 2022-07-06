import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { FplIdContext } from "app_content";
import { auth, logout } from "config";
import { getLocalImage } from "helpers";

import { AuthModalView } from "components/layout";

import { GameweekCountdown } from "./gw_countdown";
import { MenuList } from "./menu_list";

interface NavDrawerProps {
  active: string;
  openAuthModal: (value: AuthModalView) => void;
}

export interface MenuItemType {
  label: string;
  href?: string;
  onItemClick?: () => void;
}

export interface MenuItems {
  nav: MenuItemType[];
  auth: MenuItemType[];
}

export default function NavDrawer({ active, openAuthModal }: NavDrawerProps): JSX.Element {
  const { fplId, setFplId } = useContext(FplIdContext);
  const [user] = useAuthState(auth);
  const theme = useTheme();

  const onLogoutClick = (): void => {
    if (fplId) {
      setFplId();

      return;
    }
    logout();
  };

  const menuItems: MenuItems = {
    nav: [
      { label: "gameweek live", href: "/gameweek-live" },
      { label: "my fpl", href: "/my-fpl" },
      { label: "fixtures & results", href: "/fixtures-and-results" },
      { label: "analysis", href: "/analysis" }
    ],
    auth: fplId || user
      ? [
        { label: "logout", onItemClick: () => onLogoutClick() },
        ...user ? [{ label: "account", onItemClick: () => openAuthModal(AuthModalView.Account) }] : []
      ]
      : [
        { label: "login", onItemClick: () => openAuthModal(AuthModalView.Login) },
        { label: "register", onItemClick: () => openAuthModal(AuthModalView.Register) }
      ]
  };

  return (
    <Drawer
      anchor='left'
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
      <MenuList active={active} items={menuItems} />
    </Drawer>
  );
}
