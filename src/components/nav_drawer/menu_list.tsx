import { List, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "./types";

interface MenuListProps {
  items: MenuItem[];
  activeLabel: string;
}

export default function MenuList({ items, activeLabel }: MenuListProps) {
  return (
    <List>
      {items.map((item: MenuItem, index: number) => (
        <ListItemButton
          sx={{
            m: 2,
            "&:hover": { backgroundColor: "inherit" },
          }}
          disableRipple={true}
          key={index}
          component={Link}
          to={item.href}
        >
          <ListItemText
            primary={item.label.toUpperCase()}
            primaryTypographyProps={{
              fontSize: "30px",
              lineHeight: "normal",
              ...(item.label === activeLabel ? { color: "black" } : { color: "white" }),
              sx: { "&:hover": { color: "black" } },
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
