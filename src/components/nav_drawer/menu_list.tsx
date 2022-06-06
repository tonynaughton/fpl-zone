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
          sx={{
            p: '1vw',
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
              component: "h2",
              fontSize: '1.5vw',
              fontWeight: '600',
              lineHeight: 1,
              ...(item.label === activeLabel ? { color: "black" } : { color: "white" }),
              sx: { "&:hover": { color: "black" } },
            }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
