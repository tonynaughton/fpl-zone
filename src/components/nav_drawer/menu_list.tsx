import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, List } from "@mui/material";
import { AuthContext } from "app_content";
import { logout } from "config";

import { AuthModalContext, AuthModalView } from "components/layout";

import { MenuItem } from "./menu_item";
import { MenuItemType } from "./types";

interface MenuListProps {
  activeId: string;
  closeNavDrawer: () => void;
}

export const MenuList = ({ activeId, closeNavDrawer }: MenuListProps): JSX.Element => {
  const { fplId, setFplId, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setAuthModalView } = useContext(AuthModalContext);

  const onLogoutClick = (): void => {
    fplId ? setFplId() : logout();
  };

  const onAuthItemClick = (view: AuthModalView): void => {
    closeNavDrawer();
    setAuthModalView(view);
  };

  const navMenuItems: MenuItemType[] = [
    { id: "gw-live", label: "gameweek live", onClick: () => navigate("/gameweek-live"), type: "nav" },
    { id: "my-fpl", label: "my fpl", onClick: () => navigate("/my-fpl"), type: "nav" },
    { id: "fix-and-res", label: "fixtures & results", onClick: () => navigate("/fixtures-and-results"), type: "nav" },
    { id: "analysis", label: "analysis", onClick: () => navigate("/analysis"), type: "nav" }
  ];

  const authMenuItems: MenuItemType[] = [...user || fplId
    ? [
      { id: "logout", label: "logout", onClick: onLogoutClick, type: "auth" as const },
      ...user ? [{ id: "account", label: "account", onClick: () => onAuthItemClick("account"), type: "auth" as const }] : []
    ]
    : [
      { id: "login", label: "login", onClick: () => onAuthItemClick("login"), type: "auth" as const },
      { id: "register", label: "register", onClick: () => onAuthItemClick("register"), type: "auth" as const }
    ]
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
