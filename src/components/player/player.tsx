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
          height={50}
        />
      </Grid>
      <Box
        sx={{
          color: "black",
          textAlign: "center",
          width: "100%",
          maxWidth: "6em",
          pl: 0.5,
          pr: 0.5,
        }}
      >
        <Box sx={{ display: "flex", height: "100%", width: "100%", justifyContent: "center" }}>
          <Typography
            data-testid="player-name"
            sx={{
              p: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              backgroundColor: "#16B7EA",
              fontSize: "14px",
              width: "100%",
            }}
          >
            {player.web_name.toUpperCase()}
          </Typography>
          <Typography
            data-testid="player-score"
            sx={{
              backgroundColor: "#5fdd6b",
              fontSize: "14px",
              p: 0.5,
              width: "50%",
              maxWidth: "2em",
            }}
          >
            {player.event_points}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
