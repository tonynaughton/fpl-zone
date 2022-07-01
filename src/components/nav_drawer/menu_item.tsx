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
  const shadow = "0px 5px 10px -5px black";

  const getStyle = (highlighted = true): Record<string, string | number> => ({
    pb: 1,
    pt: 1,
    mb: 2,
    border: "1px solid",
    borderWidth: "1px 0",
    transition: "none",
    animation: "none",
    borderColor: highlighted ? "black" : theme.palette.primary.main,
    boxShadow: highlighted ? shadow : "none",
    color: highlighted ? "black" : theme.palette.info.main,
    bgcolor: highlighted ? theme.palette.info.main : "inherit"
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
