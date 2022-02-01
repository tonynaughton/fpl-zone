import { Grid, Typography } from "@mui/material";
import React from "react";

interface LogoProps {
  compact?: boolean;
}

export default function Logo({ compact }: LogoProps) {
  const logoDimens = compact ? "50px" : "100px";
  const textVariant = compact ? "40px" : "100px";
  return (
    <Grid sx={{ p: 1 }} container alignItems="center">
      <Grid item>
        <img
          className="football-icon"
          alt="logo"
          src={`${process.env.PUBLIC_URL}/assets/images/football.png`}
          height={logoDimens}
          width={logoDimens}
        />
      </Grid>
      <Grid item sx={{ ml: 0.8 }}>
        <Typography component="h1" fontSize={textVariant} textAlign="center">
          FPL Zone
        </Typography>
      </Grid>
    </Grid>
  );
}
