import React from "react";
import { Info } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
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
  const theme = useTheme();

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
          bgcolor={theme.palette.primary.main}
          className='flex-center'
          flexGrow={1}
          overflow='hidden'
          paddingLeft='0.5vw'
          paddingRight='0.5vw'
        >
          <Typography
            className='text-ellipsis'
            color={theme.palette.info.main}
            data-testid='player-name'
          >
            {player.web_name.toUpperCase()}
          </Typography>
        </Box>
        <Box
          bgcolor={theme.palette.secondary.main}
          className='flex-center'
          overflow='hidden'
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
          bgcolor='black'
          className='flex-center'
          data-testid={`player-performance-button-${player.id}`}
          minWidth='10px'
          onClick={(): void => handlePlayerPerformanceClick(player)}
          padding={0.5}
          sx={{ "& :hover": { cursor: "pointer" } }}
        >
          <Info color='info' sx={{ fontSize: "2vh" }} />
        </Box>
      </Box>
    </Box>
  );
}
