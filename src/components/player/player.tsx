import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Player as PlayerType } from "types/player";

interface PlayerProps {
  player: PlayerType;
}

export default function Player({ player }: PlayerProps): JSX.Element {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/kits/${player.team_code}.png`}
          alt="kit-img"
          height={50}
          width={50}
        />
      </Grid>
      <Grid item>
        <Typography>{player.web_name}</Typography>
      </Grid>
      <Grid item>
        <Typography>{player.event_points}</Typography>
      </Grid>
    </Grid>
  );
}
