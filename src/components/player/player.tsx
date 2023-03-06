import React, { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamKitImageUrl } from "helpers";
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
  const { isMobile } = useContext(AppDataContext);
  const isGoalkeeper = player.element_type === 1;
  const url = getTeamKitImageUrl(player.team_code, isGoalkeeper);

  const Name = (): JSX.Element => (
    <Box
      bgcolor={theme.palette.primary.main}
      className='flex-center'
      height='100%'
      overflow='hidden'
      p='0.1rem'
      width='100%'
    >
      <Typography
        className='text-ellipsis'
        color={theme.palette.info.main}
        data-testid='player-name'
        fontSize={isMobile ? "0.8rem" : theme.typography.body1.fontSize}
      >
        {player.web_name.toUpperCase()}
      </Typography>
    </Box>
  );

  const Score = (): JSX.Element => (
    <Box
      bgcolor={theme.palette.secondary.main}
      className='flex-center'
      height='100%'
      overflow='hidden'
      p='0.1rem'
      width='100%'
    >
      <Typography
        data-testid='player-score'
        fontSize={isMobile ? "1rem" : theme.typography.body1.fontSize}
        px={1}
      >
        {player.event_points * multiplier}
      </Typography>
    </Box>
  );

  return (
    <Box
      className='flex-center'
      data-testid={`player-container-${player.id}`}
      flexDirection='column'
      height='100%'
      maxWidth='8rem'
      onClick={(): void => handlePlayerPerformanceClick(player)}
      overflow='hidden'
      position='relative'
      sx={{ cursor: "pointer" }}
      width='18%'
    >
      {isCaptain && <Armband />}
      {isViceCaptain && <Armband isVice />}
      <img
        alt='team-kit'
        className='kit-img'
        data-testid={`kit-img-player-${player.id}`}
        src={url}
      />
      <Box
        bottom={0}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        position='absolute'
        width='100%'
      >
        <Name />
        <Score />
      </Box>
    </Box>
  );
}
