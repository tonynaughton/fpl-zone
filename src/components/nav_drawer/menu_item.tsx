import React, { useContext } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { isEmpty } from "lodash";

import { MenuItemType } from "./menu_list";

interface MenuItemProps {
  menuItem: MenuItemType;
  activeId?: string;
}

interface ButtonMenuItemProps {
  buttonMenuItem: MenuItemType;
}

export const MenuItem = ({ menuItem, activeId }: MenuItemProps): JSX.Element => {
  const theme = useTheme();
  const { isMobile } = useContext(AppDataContext);

  const btnStyle = {
    paddingY: 2,
    bgcolor: "inherit",
    "& .MuiTypography-root": {
      fontWeight: 600
    },
    "&:hover": {
      bgcolor: "inherit",
      "& .MuiTypography-root": {
        color: "black"
      }
    }
  };

  const ItemButton = ({ buttonMenuItem }: ButtonMenuItemProps): JSX.Element => (
    <ListItemButton
      component={Box}
      data-testid={`menu-item-button-${buttonMenuItem.id}`}
      disableRipple
      onClick={buttonMenuItem.onClick}
      sx={{
        ...btnStyle,
        "& .MuiTypography-root": {
          color: buttonMenuItem.id === activeId ? "black" : theme.palette.info.main
        }
      }}
    >
      <Typography
        data-testid={`menu-item-text-${buttonMenuItem.id}`}
        variant='h4'
      >
        {buttonMenuItem.label.toUpperCase()}
      </Typography>
    </ListItemButton>
  );

  return (
    isMobile && !isEmpty(menuItem.subItems)
      ? (
        <Accordion sx={{ background: "inherit" }}>
          <AccordionSummary>
            <Typography
              color={theme.palette.info.main}
              data-testid={`menu-item-text-${menuItem.id}`}
              variant='h4'
            >
              {menuItem.label.toUpperCase()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {menuItem.subItems?.map((subMenuItem: MenuItemType, key: number) => (
                <ItemButton buttonMenuItem={subMenuItem} key={key} />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )
      : (
        <ItemButton buttonMenuItem={menuItem} />
      )
  );
};
