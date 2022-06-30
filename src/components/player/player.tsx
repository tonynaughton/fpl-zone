import React from "react";
import { Info } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { getLocalImage } from "helpers";
import { Player as PlayerType } from "types/player";

import { Armband } from "./armband";

import "./player.css";

interface PlayerProps {
  player: PlayerType;
  handlePlayerPerformanceClick: (player: PlayerType) => void;
  multiplier: number;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
}

export default function Player({
  player,
  handlePlayerPerformanceClick,
  multiplier,
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
      maxHeight='100%'
      minHeight={0}
      minWidth={0}
      overflow='hidden'
      position='relative'
      width='8vw'
    >
      {isCaptain && <Armband />}
      {isViceCaptain && <Armband isVice />}
      <img
        alt='team-kit'
        className='kit-img'
        data-testid={`kit-img-player-${player.id}`}
        src={getLocalImage(url)}
      />
      <Box
        bottom={0}
        display='flex'
        height='3.5vh'
        justifyContent='center'
        position='absolute'
        width='100%'
      >
        <Box
          className='flex-center'
          flexGrow={1}
          overflow='hidden'
          paddingLeft='0.5vw'
          paddingRight='0.5vw'
          bgcolor='#16B7EA'
        >
          <Typography
            className='text-ellipsis'
            data-testid='player-name'
          >
            {player.web_name}
          </Typography>
        </Box>
        <Box
          className='flex-center'
          overflow='hidden'
          bgcolor='#5fdd6b'
        >
          <Typography
            data-testid='player-score'
            paddingLeft='0.5vw'
            paddingRight='0.5vw'
          >
            {player.event_points * multiplier}
          </Typography>
        </Box>
        <Box
          className='flex-center'
          data-testid={`player-performance-button-${player.id}`}
          minWidth='10px'
          onClick={(): void => handlePlayerPerformanceClick(player)}
          padding={0.5}
          bgcolor='black'
          sx={{ "& :hover": { cursor: "pointer" } }}
        >
          <Info sx={{ color: "white", fontSize: "2vh" }} />
        </Box>
      </Box>
    </Box>
  );
}
