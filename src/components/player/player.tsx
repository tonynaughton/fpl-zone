import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Player as PlayerType } from "types/player";

interface PlayerProps {
  player: PlayerType;
}

export default function Player({ player }: PlayerProps): JSX.Element {
  return (
    <Grid container direction="column" alignItems="center" data-testid={player.id}>
      <Grid item>
        <img
          data-testid="player-shirt-image"
          src={`${process.env.PUBLIC_URL}/assets/images/kits/${player.team_code}.png`}
          alt="kit-img"
          height={55}
        />
      </Grid>
      <Box
        sx={{
          backgroundColor: "#5fdd6b",
          color: "black",
          textAlign: "center",
          width: "80%",
          pl: 0.5,
          pr: 0.5,
        }}
      >
        <Grid item>
          <Typography
            data-testid="player-name"
            fontSize={14}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {player.web_name.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item className="player-text-points">
          <Typography data-testid="player-score" fontSize={14}>
            {player.event_points}
          </Typography>
        </Grid>
      </Box>
    </Grid>
  );
}
