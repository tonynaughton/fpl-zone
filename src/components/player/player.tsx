import React from "react";
import { Info } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { getLocalImage } from "helpers";
import { Player as PlayerType } from "types/player";

import { Armband } from "./armband";

interface PlayerProps {
  player: PlayerType;
  handlePlayerPerformanceClick: (player: PlayerType) => void;
  compressed: boolean;
  multiplier: number;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
}

export default function Player({
  player,
  handlePlayerPerformanceClick,
  compressed = false,
  multiplier: multipler,
  isCaptain = false,
  isViceCaptain = false
}: PlayerProps): JSX.Element {

  const textStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  };

  const url = `kits/${player.team_code}.png`;

  return (
    <Box
      data-testid={`player-container-${player.id}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        alginItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      <Box
        data-testid={`kit-img-container-${player.id}`}
        sx={{
          display: "block",
          width: compressed ? "3.5vw" : "5.5vw",
          height: compressed ? "5.5vh" : "7.5vh",
          margin: "auto",
          backgroundImage: `url(${getLocalImage(url)})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      />
      <Box
        sx={{
          color: "black",
          textAlign: "center",
          width: compressed ? "7.5vw" : "9.5vw",
          maxWidth: "180px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "4vh"
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
              p: compressed ? 0.5 : 1
            }}
          >
            <Typography
              data-testid='player-name'
              sx={textStyle}
              variant={compressed ? "body2" : "body1"}
            >
              {player.web_name}
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
              backgroundColor: "#5fdd6b"
            }}
          >
            <Typography
              data-testid='player-score'
              sx={textStyle}
              variant={compressed ? "body2" : "body1"}
            >
              {player.event_points * multipler}
            </Typography>
          </Box>
          <Box
            onClick={(): void => handlePlayerPerformanceClick(player)}
            sx={{
              p: compressed ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "black",
              "& :hover": {
                cursor: "pointer"
              },
              justifyContent: "center"
            }}
          >
            <Info sx={{ color: "white", fontSize: "1.2vw" }} />
          </Box>
        </Box>
        {isCaptain && <Armband />}
        {isViceCaptain && <Armband isVice />}
      </Box>
    </Box>
  );
}
