import React from "react";
import { Link } from "react-router-dom";
import { Box, ListItemButton, Typography, useTheme } from "@mui/material";

import { isNavMenuItem, MenuItemType } from "./types";

interface MenuItemProps {
  item: MenuItemType;
  isActive?: boolean;
}

export const MenuItem = ({ item, isActive: active = false }: MenuItemProps): JSX.Element => {
  const theme = useTheme();

  const btnStyle = {
    paddingY: 2,
    bgcolor: "inherit",
    "& .MuiTypography-root": {
      color: active ? "black" : theme.palette.info.main
    },
    "&:hover": {
      bgcolor: "inherit",
      "& .MuiTypography-root": {
        color: "black"
      }
    }
  };

  return (
    <ListItemButton
      component={isNavMenuItem(item) ? Link : Box}
      data-testid={`menu-item-button-${item.id}`}
      disableRipple
      onClick={!isNavMenuItem(item) ? item.onClick : undefined}
      sx={btnStyle}
      to={isNavMenuItem(item) ? item.href : undefined}
    >
      <Typography
        data-testid={`menu-item-text-${item.id}`}
        variant='h2'
      >
        {item.label.toUpperCase()}
      </Typography>
    </ListItemButton>
  );
};
