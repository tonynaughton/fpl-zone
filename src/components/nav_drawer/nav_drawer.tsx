import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Logo from "components/logo/logo";
import { Grid, ListItemButton } from "@mui/material";
import "./nav_drawer.css";

const drawerWidth = 250;

const mainMenuItems = [
  { label: "gameweek live", href: "/gameweek-live" },
  { label: "my team", href: "/gameweek-live" },
  { label: "fixtures & results", href: "/fixtures-and-results" },
  { label: "analysis", href: "/analysis" },
  { label: "social", href: "/social" },
];

const endMenuItems = [
  { label: "account", href: "/account" },
  { label: "logout", href: "/logout" },
];

export default function NavDrawer() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Grid container className="logo-container">
        <Grid item>
          <Logo compact={true} />
        </Grid>
      </Grid>
      <List>
        {mainMenuItems.map((item, index) => (
          <ListItemButton key={index} href={item.href}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: "black" }} primary={item.label.toUpperCase()} />
          </ListItemButton>
        ))}
        <Divider />
        {endMenuItems.map((item, index) => (
          <ListItemButton key={index} href={item.href}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText sx={{ color: "black" }} primary={item.label.toUpperCase()} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
