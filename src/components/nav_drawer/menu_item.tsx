import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, ListItemButton, Typography, useTheme } from "@mui/material";

import { AuthModalContext } from "components/layout";

import { MenuItemType } from "./nav_drawer";

interface MenuItemProps {
  item: MenuItemType;
  active?: boolean;
}

export const MenuItem = ({ item, active = false }: MenuItemProps): JSX.Element => {
  const { setAuthModalView } = useContext(AuthModalContext);
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
      component={item.href ? Link : Box}
      data-testid={`menu-item-button-${item.id}`}
      disableRipple
      onClick={item.view ? (): void => setAuthModalView(item.view!) : undefined}
      sx={btnStyle}
      to={item.href}
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
