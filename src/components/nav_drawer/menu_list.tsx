import React, { useState } from "react";
import { Box, List } from "@mui/material";
import { useMenuItems } from "hooks/use_menu_items";

import { MenuItem } from "./menu_item";

interface MenuListProps {
  activeId: string;
  closeNavDrawer: () => void;
}

export interface MenuItemType {
  id: string;
  label: string;
  onClick: () => void;
  subItems?: MenuItemType[];
}

export const MenuList = ({ activeId, closeNavDrawer }: MenuListProps): JSX.Element => {
  const menuItems = useMenuItems(closeNavDrawer);
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='space-between'
      width='100%'
    >
      <List>
        {menuItems.nav.map((item, key: number) => (
          <MenuItem
            activeId={activeId}
            expandedPanel={expandedPanel}
            key={key}
            menuItem={item}
            setExpandedPanel={setExpandedPanel}
          />
        ))}
      </List>
      <List>
        {menuItems.auth.map((item, key: number) => (
          <MenuItem
            activeId={activeId}
            key={key}
            menuItem={item}
          />
        ))}
      </List>
    </Box>
  );
};
