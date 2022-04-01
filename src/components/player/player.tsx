import React from "react";
import { Box, Typography } from "@mui/material";
import { Player as PlayerType } from "types/player";
import { Info } from "@mui/icons-material";

interface PlayerProps {
  player: PlayerType;
  onPlayerInfoClick: (player: PlayerType) => void;
  compressed: boolean;
}

export default function Player({
  player,
  onPlayerInfoClick,
  compressed,
}: PlayerProps): JSX.Element {
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
          width: compressed ? "3.5vw" : "5.5vw",
          height: compressed ? "5.5vh" : "7.5vh",
          margin: "auto",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/kits/${player.team_code}.png)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Box
        sx={{
          color: "black",
          textAlign: "center",
          width: compressed ? "6.5vw" : "9vw",
          maxWidth: "180px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: compressed ? "3vh" : "4vh",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#16B7EA",
              width: "75%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: compressed ? 0.5 : 1,
            }}
          >
            <Typography
              data-testid="player-name"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: compressed ? "0.8em" : "1em",
              }}
            >
              {player.web_name.toUpperCase()}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "25%",
              minWidth: compressed ? "20px" : "30px",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#5fdd6b",
            }}
          >
            <Typography
              data-testid="player-score"
              sx={{
                fontSize: compressed ? "0.8em" : "1em",
              }}
            >
              {player.event_points}
            </Typography>
          </Box>
          <Box
            onClick={(): void => onPlayerInfoClick(player)}
            sx={{
              p: compressed ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "black",
              "& :hover": {
                cursor: "pointer",
              },
            }}
          >
            <Info sx={{ color: "white", fontSize: "1em" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
