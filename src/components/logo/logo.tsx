import { Grid, Typography } from "@mui/material";
import React from "react";

export default function Logo() {
  return (
    <Grid container spacing="10" alignItems="center">
      <Grid item>
        <img
          className="football-icon"
          alt="logo"
          src={`${process.env.PUBLIC_URL}/assets/images/football.png`}
        />
      </Grid>
      <Grid item>
        <Typography component="h1" variant="h1" textAlign="center">
          FPL ZONE
        </Typography>
      </Grid>
    </Grid>
  );
}
