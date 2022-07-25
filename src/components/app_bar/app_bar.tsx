import React from "react";
import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { getLocalImage } from "helpers";

interface CustomAppBarProps {
  openNavDrawer: () => void;
}

export const APP_BAR_HEIGHT = "56px";

export const CustomAppBar = ({ openNavDrawer }: CustomAppBarProps): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position='fixed' sx={{ minHeight: APP_BAR_HEIGHT, display: isMobile ? "block" : "none" }}>
      <Toolbar
        alignItems='center'
        component={Box}
        display='flex'
        justifyContent='space-between'
      >
        <IconButton
          color='inherit'
          edge='start'
          onClick={openNavDrawer}
          size='large'
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <img
          alt='fpl-zone-logo'
          height='35px'
          src={getLocalImage("logo.png")}
          width='auto'
        />
      </Toolbar>
    </AppBar>
  );
};
