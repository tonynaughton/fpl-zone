import React, { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { AppDataContext } from "app_content";
import { getLocalImage } from "helpers";

import { GameweekCountdown } from "./gw_countdown";
import { MenuList } from "./menu_list";

interface NavDrawerProps {
  activeId: string;
  isNavDrawerOpen: boolean;
  closeNavDrawer: () => void;
  navDrawerWidth: string;
}

export default function NavDrawer({ activeId, isNavDrawerOpen, closeNavDrawer, navDrawerWidth }: NavDrawerProps): JSX.Element {
  const theme = useTheme();
  const { isMobile } = useContext(AppDataContext);

  return (
    <Drawer
      ModalProps={{ onBackdropClick: closeNavDrawer }}
      anchor='left'
      data-testid='nav-drawer'
      open={isNavDrawerOpen}
      sx={{
        p: 0,
        width: navDrawerWidth,
        maxWidth: navDrawerWidth,
        "& .MuiDrawer-paper": {
          width: "inherit",
          maxWidth: "inherit",
          bgcolor: theme.palette.primary.main,
          borderRight: "2px solid black"
        }
      }}
      variant={isMobile ? "temporary" : "permanent"}
    >
      <Box
        bgcolor={theme.palette.secondary.main}
        borderBottom='2px solid black'
        className='flex-center'
        flexDirection='column'
        gap={1}
        padding={1}
        width='100%'
      >
        <img alt='fpl-zone-logo' src={getLocalImage("logo.png")} width='100%' />
        <GameweekCountdown />
      </Box>
      <MenuList activeId={activeId} closeNavDrawer={closeNavDrawer} />
    </Drawer>
  );
}
