import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { getPlayerData } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import { getLocalImage } from "helpers";
import { FixtureLocation,Player as PlayerType } from "types";

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
  const [fixtureLocation, setFixtureLocation] = useState<FixtureLocation>("home");

  useEffect(() => {
    const getPlayerPerformance = async (): Promise<void> => {
      const { history } = await getPlayerData(player.id);

      const latestFixture = history[history.length - 1];

      setFixtureLocation(latestFixture.was_home ? "home" : "away");
    };

    getPlayerPerformance();
  }, []);

  const url = getLocalImage(`kits/${player.team_code}_${fixtureLocation}.png`);

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
