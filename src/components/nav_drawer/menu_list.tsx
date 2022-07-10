import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, List } from "@mui/material";
import { FplIdContext } from "app_content";
import { auth } from "config";

import { MenuItem } from "./menu_item";
import { MenuItems } from "./nav_drawer";

interface MenuListProps {
  items: MenuItems;
  activeId: string;
}

export const MenuList = ({ items, activeId }: MenuListProps): JSX.Element => {
  const { fplId } = useContext(FplIdContext);
  const [user] = useAuthState(auth);

  const authItemIds = fplId || user ? ["logout", "account"] : ["login", "register"];

  const filteredAuthItems = items.auth.filter(item => authItemIds.includes(item.id));

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='space-between'
      width='100%'
    >
      <List>
        {items.nav.map((item, key: number) => (
          <MenuItem active={activeId === item.id} item={item} key={key} />
        ))}
      </List>
      <List>
        {filteredAuthItems.map((item, key: number) => (
          <MenuItem item={item} key={key} />
        ))}
      </List>
    </Box>
  );
};
