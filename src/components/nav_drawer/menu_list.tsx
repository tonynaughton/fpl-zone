import { List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { MenuItem } from "./types";

interface MenuListProps {
  items: MenuItem[];
  activeId: string;
}

export default function MenuList({ items, activeId }: MenuListProps) {
  return (
    <List>
      {items.map((item: MenuItem, index: number) => (
        <ListItemButton
          sx={{
            m: 2,
            ...(item.id === activeId && { color: "black" }),
            "&:hover": { color: "black", backgroundColor: "inherit" },
          }}
          key={index}
          href={item.href}
        >
          <ListItemText
            disableTypography
            primary={item.label.toUpperCase()}
            className="menu-item-text"
          />
        </ListItemButton>
      ))}
    </List>
  );
}
