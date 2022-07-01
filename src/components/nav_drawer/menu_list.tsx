import React from "react";
import { Box, List } from "@mui/material";

import { MenuItem } from "./menu_item";
import { MenuItems } from "./nav_drawer";

interface MenuListProps {
  items: MenuItems;
  active: string;
}

export const MenuList = ({ items, active }: MenuListProps): JSX.Element => (
  <Box
    display='flex'
    flexDirection='column'
    height='100%'
    justifyContent='space-between'
    width='100%'
  >
    <List>
      {items.nav.map((item, key: number) => (
        <MenuItem active={active === item.label} item={item} key={key} />
      ))}
    </List>
    <List>
      {items.auth.map((item, key: number) => (
        <MenuItem item={item} key={key} />
      ))}
    </List>
  </Box>
);
