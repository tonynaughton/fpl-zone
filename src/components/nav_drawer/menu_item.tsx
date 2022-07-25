import React from "react";
import { Box, ListItemButton, Typography, useTheme } from "@mui/material";

import { MenuItemType } from "./types";

interface MenuItemProps {
  item: MenuItemType;
  isActive?: boolean;
}

export const MenuItem = ({ item, isActive = false }: MenuItemProps): JSX.Element => {
  const theme = useTheme();

  const btnStyle = {
    paddingY: 2,
    bgcolor: "inherit",
    "& .MuiTypography-root": {
      fontWeight: 600,
      color: isActive ? "black" : theme.palette.info.main,
      [theme.breakpoints.down("md")]: {
        fontSize: "1.8rem"
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.2rem"
      }
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
      component={Box}
      data-testid={`menu-item-button-${item.id}`}
      disableRipple
      onClick={item.onClick}
      sx={btnStyle}
    >
      <Typography
        data-testid={`menu-item-text-${item.id}`}
      >
        {item.label.toUpperCase()}
      </Typography>
    </ListItemButton>
  );
};
