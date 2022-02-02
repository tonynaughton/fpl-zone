import { List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { MenuItem } from "./types";

interface MenuListProps {
  items: MenuItem[];
}

export default function MenuList({ items }: MenuListProps) {
  return (
    <List>
      {items.map((item: MenuItem, index: number) => (
        <ListItemButton
          sx={{ m: 2, "& .MuiListItemButton-hover": { backgroundColor: "red" } }}
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
