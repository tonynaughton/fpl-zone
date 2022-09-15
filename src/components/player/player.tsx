import React, { useContext } from "react";
import { Info as InfoIcon } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { getLocalImage } from "helpers";
import { Player as PlayerType } from "types/player";

import { Armband } from "./armband";

import "./player.css";
import { AppDataContext } from "app_content";

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

  const url = `kits/${player.team_code}.png`;

  const Name = (): JSX.Element => (
    <Box
      bgcolor={theme.palette.primary.main}
      className='flex-center'
      overflow='hidden'
      p={isMobile ? 0.5 : 1}
      width='100%'
      height='100%'
    >
      <Typography
        className='text-ellipsis'
        color={theme.palette.info.main}
        data-testid='player-name'
        fontSize={isMobile ? '0.8rem' : theme.typography.body1.fontSize}
      >
        {player.web_name.toUpperCase()}
      </Typography>
    </Box>
  );

  const Score = (): JSX.Element => (
    <Box
      bgcolor={theme.palette.secondary.main}
      className='flex-center'
      overflow='hidden'
      height='100%'
      p={0.75}
    >
      <Typography
        data-testid='player-score'
        px={isMobile ? 1 : 3}
        fontSize={isMobile ? '1rem' : theme.typography.body1.fontSize}
      >
        {player.event_points * multiplier}
      </Typography>
    </Box>
  );

  const Info = (): JSX.Element => (
    <Box
      bgcolor='black'
      className='flex-center'
      data-testid={`player-performance-button-${player.id}`}
      minWidth='10px'
      height='100%'
      onClick={(): void => handlePlayerPerformanceClick(player)}
      p={0.75}
      sx={{ "& :hover": { cursor: "pointer" } }}
      fontSize='0.8rem'
    >
      <InfoIcon color='info' sx={{ fontSize: theme.typography.h5 }} />
    </Box>
  );

  return (
    <Box
      className='flex-center'
      data-testid={`player-container-${player.id}`}
      flexDirection='column'
      height='100%'
      maxHeight='100%'
      maxWidth={isMobile ? '65px' : undefined}
      minHeight={0}
      minWidth={0}
      overflow='hidden'
      position='relative'
      width={isMobile ? '100%' : '8vw'}
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
        justifyContent='center'
        position='absolute'
        width='100%'
        height={isMobile ? '40%' : '25%'}
      >
        {isMobile ? (
          <Box display='flex' flexDirection='column' overflow='hidden'>
            <Box className='flex-center' height='50%'>
              <Name/>
            </Box>
            <Box className='flex-center' height='50%'>
              <Score/>
              <Info/>
            </Box>
          </Box>
        ) : (
          <>
            <Name/>
            <Score/>
            <Info/>
          </>
        )}
      </Box>
    </Box>
  );
}
