import React, { useContext } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";

import { MenuItemType } from "./menu_list";

interface MenuItemProps {
  menuItem: MenuItemType;
  isActive?: boolean;
}

interface ButtonMenuItemProps {
  buttonMenuItem: MenuItemType;
}

export const MenuItem = ({ menuItem, isActive = false }: MenuItemProps): JSX.Element => {
  const theme = useTheme();
  const { isMobile } = useContext(AppDataContext);

  const btnStyle = {
    paddingY: 2,
    bgcolor: "inherit",
    "& .MuiTypography-root": {
      fontWeight: 600,
      color: isActive ? "black" : theme.palette.info.main,
      fontSize: isMobile ? "1.8rem" : "1.2rem"
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
      sx={btnStyle}
    >
      <Typography
        data-testid={`menu-item-text-${buttonMenuItem.id}`}
      >
        {buttonMenuItem.label.toUpperCase()}
      </Typography>
    </ListItemButton>
  );

  const ButtonWithAccordion = (): JSX.Element => (
    <Accordion>
      <AccordionSummary>
        <Typography
          data-testid={`menu-item-text-${menuItem.id}`}
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
  );


  return isMobile ? <ButtonWithAccordion /> : <ItemButton buttonMenuItem={menuItem} />;
};
