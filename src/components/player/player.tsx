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

  const url = `kits/${player.team_code}.png`;

  return (
    <Box
      className='flex-center'
      data-testid={`player-container-${player.id}`}
      flexDirection='column'
      height='100%'
      minWidth={0}
      position='relative'
      width='auto'
    >
      <Box
        data-testid={`kit-img-container-${player.id}`}
        height='100%'
        overflow='hidden'
        sx={{
          backgroundImage: `url(${getLocalImage(url)})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
        width={compressed ? "4em" : "6em"}
      />
      <Box
        height='auto'
        maxWidth='12vw'
        width={compressed ? "7.5vw" : "9.5vw"}
      >
        <Box
          display='flex'
          justifyContent='center'
          minWidth={0}
          width='100%'
        >
          <Box
            className='flex-center'
            flexGrow={1}
            overflow='hidden'
            paddingLeft='0.5vw'
            paddingRight='0.5vw'
            sx={{ backgroundColor: "#16B7EA" }}
          >
            <Typography
              className='text-ellipsis'
              data-testid='player-name'
              variant={compressed ? "body2" : "body1"}
            >
              {player.web_name}
            </Typography>
          </Box>
          <Box
            className='flex-center'
            overflow='hidden'
            sx={{ backgroundColor: "#5fdd6b" }}
          >
            <Typography
              data-testid='player-score'
              paddingLeft='0.5vw'
              paddingRight='0.5vw'
              variant={compressed ? "body2" : "body1"}
            >
              {player.event_points * multipler}
            </Typography>
          </Box>
          <Box
            className='flex-center'
            minWidth='10px'
            onClick={(): void => handlePlayerPerformanceClick(player)}
            padding={compressed ? 0.5 : 1}
            sx={{ backgroundColor: "black", "& :hover": { cursor: "pointer" } }}
          >
            <Info sx={{ color: "white", fontSize: "2vh" }} />
          </Box>
        </Box>
        {isCaptain && <Armband />}
        {isViceCaptain && <Armband isVice />}
      </Box>
    </Box>
  );
}
