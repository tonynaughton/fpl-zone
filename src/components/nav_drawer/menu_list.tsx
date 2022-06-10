import React from "react";
import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemText } from "@mui/material";

import { MenuItem } from "./types";

interface MenuListProps {
  items: MenuItem[];
  activeLabel: string;
}

export default function MenuList({ items, activeLabel }: MenuListProps): JSX.Element {
  return (
    <List>
      {items.map((item: MenuItem, index: number) => (
        <ListItemButton
          component={Link}
          disableRipple
          key={index}
          sx={{
            p: "1vw",
            "&:hover": { backgroundColor: "inherit" },
            width: "100%"
          }}
          to={item.href}
        >
          <ListItemText
            primary={item.label.toUpperCase()}
            primaryTypographyProps={{
              variant: "h2",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              ...(item.label === activeLabel ? { color: "black" } : { color: "white" }),
              sx: { "&:hover": { color: "black" } }
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
