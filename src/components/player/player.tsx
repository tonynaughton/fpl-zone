import React from "react";
import { Box, Typography } from "@mui/material";
import { Player as PlayerType } from "types/player";

interface PlayerProps {
  player: PlayerType;
}

export default function Player({ player }: PlayerProps): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alginItems: "center",
        justifyContent: "center",
      }}
      data-testid={player.id}
    >
      <Box
        sx={{
          display: "block",
          width: "4vw",
          height: "5vh",
          margin: "auto",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/kits/${player.team_code}.png)`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        sx={{
          color: "black",
          textAlign: "center",
          width: "7vw",
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
              fontSize: "1em",
              width: "75%",
            }}
          >
            {player.web_name.toUpperCase()}
          </Typography>
          <Typography
            data-testid="player-score"
            sx={{
              backgroundColor: "#5fdd6b",
              fontSize: "1em",
              p: 0.5,
              width: "1.5em",
            }}
          >
            {player.event_points}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
