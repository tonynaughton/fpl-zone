import React from "react";
import { Link } from "react-router-dom";
import { Box, ListItemButton, Typography, useTheme } from "@mui/material";

import { MenuItemType } from "./nav_drawer";

interface MenuItemProps {
  item: MenuItemType;
  active?: boolean;
}

export const MenuItem = ({ item, active = false }: MenuItemProps): JSX.Element => {
  const theme = useTheme();

  const getStyle = (highlighted = true): Record<string, string | number> => ({
    paddingY: 2,
    transition: "none",
    animation: "none",
    color: highlighted ? "black" : theme.palette.info.main,
    bgcolor: "inherit"
  });

  return (
    <ListItemButton
      component={item.href ? Link : Box}
      disableRipple
      onClick={item.onItemClick}
      sx={{
        ...getStyle(active),
        "&:hover": { ...getStyle() }
      }}
      to={item.href}
    >
      <Typography
        data-testid='menu-list-item-text'
        variant='h2'
      >
        {item.label.toUpperCase()}
      </Typography>
    </ListItemButton>
  );
};
