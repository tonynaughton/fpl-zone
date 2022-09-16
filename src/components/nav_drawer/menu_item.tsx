import React, { useContext } from "react";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItemButton, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { isEmpty } from "lodash";

import { MenuItemType } from "./menu_list";

interface MenuItemProps {
  menuItem: MenuItemType;
  activeId?: string;
  expandedPanel?: string | false;
  setExpandedPanel?: (item: string | false) => void;
}

interface ButtonMenuItemProps {
  buttonMenuItem: MenuItemType;
}

export const MenuItem = ({ menuItem, activeId, expandedPanel, setExpandedPanel }: MenuItemProps): JSX.Element => {
  const theme = useTheme();
  const { isMobile } = useContext(AppDataContext);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    if (setExpandedPanel) {
      setExpandedPanel(isExpanded ? panel : false);
    }
  };

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
        variant='h5'
      >
        {buttonMenuItem.label.toUpperCase()}
      </Typography>
    </ListItemButton>
  );

  return (
    isMobile && !isEmpty(menuItem.subItems)
      ? (
        <Accordion
          disableGutters
          expanded={expandedPanel === menuItem.id}
          onChange={handleChange(menuItem.id)}
          square
          sx={{ background: "inherit", boxShadow: "none" }}
        >
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: theme.palette.info.main }} />}>
            <Typography
              color={theme.palette.info.main}
              data-testid={`menu-item-text-${menuItem.id}`}
              variant='h5'
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
