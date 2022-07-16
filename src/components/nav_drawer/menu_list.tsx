import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, List } from "@mui/material";
import { FplIdContext } from "app_content";
import { auth, logout } from "config";

import { AuthModalContext } from "components/layout";

import { MenuItem } from "./menu_item";
import { MenuItemType } from "./types";

interface MenuListProps {
  activeId: string;
}

export const MenuList = ({ activeId }: MenuListProps): JSX.Element => {
  const { fplId, setFplId } = useContext(FplIdContext);
  const [user] = useAuthState(auth);
  const { setAuthModalView } = useContext(AuthModalContext);

  const onLogoutClick = (): void => {
    fplId ? setFplId() : logout();
  };

  const navMenuItems: MenuItemType[] = [
    { id: "gw-live", label: "gameweek live", href: "/gameweek-live", type: "nav" },
    { id: "my-fpl", label: "my fpl", href: "/my-fpl", type: "nav" },
    { id: "fix-and-res", label: "fixtures & results", href: "/fixtures-and-results", type: "nav" },
    { id: "analysis", label: "analysis", href: "/analysis", type: "nav" }
  ];

  const authMenuItems: MenuItemType[] = fplId || user
    ? [
      { id: "logout", label: "logout", onClick: onLogoutClick, type: "auth" },
      ...user ? [{ id: "account", label: "account", onClick: () => setAuthModalView("account"), type: "auth" as const }] : []
    ]
    : [
      { id: "login", label: "login", onClick: () => setAuthModalView("login"), type: "auth" },
      { id: "register", label: "register", onClick: () => setAuthModalView("register"), type: "auth" }
    ];

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='space-between'
      width='100%'
    >
      <List>
        {navMenuItems.map((item, key: number) => (
          <MenuItem isActive={activeId === item.id} item={item} key={key} />
        ))}
      </List>
      <List>
        {authMenuItems.map((item, key: number) => (
          <MenuItem item={item} key={key} />
        ))}
      </List>
    </Box>
  );
};
