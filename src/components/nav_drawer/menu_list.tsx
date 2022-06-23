import React from "react";
import { Link } from "react-router-dom";
import { Box, List, ListItemButton, ListItemText } from "@mui/material";

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
      {items.nav.map((item, key: number) => {
        return (
          <ListItemButton
            component={Link}
            disableRipple
            key={key}
            sx={{
              p: "1vw",
              "&:hover": { backgroundColor: "inherit" },
              width: "100%"
            }}
            to={item.href}
          >
            <ListItemText
              data-testid='menu-list-item-text'
              primary={item.label.toUpperCase()}
              primaryTypographyProps={{
                variant: "h2",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                ...(item.label === active ? { color: "black" } : { color: "white" }),
                sx: { "&:hover": { color: "black" } }
              }}
            />
          </ListItemButton>
        );
      })}
    </List>
    <List>
      {items.auth.map((item, key: number) => {
        return (
          <ListItemButton
            disableRipple
            key={key}
            onClick={item.onItemClick}
            sx={{
              p: "1vw",
              "&:hover": { backgroundColor: "inherit" },
              width: "100%"
            }}
          >
            <ListItemText
              data-testid='menu-list-item-text'
              primary={item.label.toUpperCase()}
              primaryTypographyProps={{
                variant: "h2",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                ...(item.label === active ? { color: "black" } : { color: "white" }),
                sx: { "&:hover": { color: "black" } }
              }}
            />
          </ListItemButton>
        );
      })}
    </List>
  </Box>
);
