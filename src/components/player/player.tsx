import React from "react";
import { Info } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Player as PlayerType } from "types/player";

interface PlayerProps {
  player: PlayerType;
  handlePlayerPerformanceClick: (player: PlayerType) => void;
  compressed: boolean;
  multiplier: number;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
}

const renderArmband = (isVice = false): JSX.Element => {
  return (
    <Box
      data-testid='armband-container'
      sx={{
        borderRadius: "50%",
        backgroundColor: "white",
        border: "1px solid black",
        position: "absolute",
        top: 0,
        left: 0,
        width: "1.5vw",
        height: "1.5vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {isVice ? "V" : "C"}
    </Box>
  );
};

export default function Player({
  player,
  handlePlayerPerformanceClick,
  compressed = false,
  multiplier: multipler,
  isCaptain = false,
  isViceCaptain = false
}: PlayerProps): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alginItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
      data-testid={player.id}
    >
      <Box
        data-testid='kit-img-container'
        sx={{
          display: "block",
          width: compressed ? "3.5vw" : "5.5vw",
          height: compressed ? "5.5vh" : "7.5vh",
          margin: "auto",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/kits/${player.team_code}.png)`,
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
              variant='body2'
              data-testid='player-name'
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
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
            <Typography variant='body2' data-testid='player-score'>
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
        {isCaptain && renderArmband()}
        {isViceCaptain && renderArmband(true)}
      </Box>
    </Box>
  );
}
