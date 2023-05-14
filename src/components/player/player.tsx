import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { getLocalImgUrl } from "helpers";
import { Player as PlayerType } from "types";

interface PlayerProps {
  player: PlayerType;
  handlePlayerPerformanceClick: (player: PlayerType) => void;
  multiplier: number;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
}

interface ArmbandProps {
  isVice?: boolean;
}

export default function Player({
  player,
  handlePlayerPerformanceClick,
  multiplier,
  isCaptain = false,
  isViceCaptain = false
}: PlayerProps): JSX.Element {
  const theme = useTheme();

  const url = getLocalImgUrl(`kits/${player.team_code}_home.png`);

  const Armband = ({ isVice = false }: ArmbandProps): JSX.Element => (
    <Box
      bgcolor={theme.palette.info.main}
      border='1px solid black'
      borderRadius='50%'
      className='flex-center'
      data-testid='armband-container'
      height='1.8rem'
      left={0}
      position='absolute'
      top={0}
      width='1.8rem'
    >
      <Typography>{isVice ? "V" : "C"}</Typography>
    </Box>
  );

  const Name = (): JSX.Element => (
    <Box
      bgcolor={theme.palette.primary.main}
      className='flex-center'
      height='100%'
      overflow='hidden'
      width='100%'
    >
      <Typography
        className='text-ellipsis'
        color={theme.palette.info.main}
        data-testid='player-name'
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
      width='100%'
    >
      <Typography
        data-testid='player-score'
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
      maxWidth='12rem'
      onClick={(): void => handlePlayerPerformanceClick(player)}
      position='relative'
      sx={{ cursor: "pointer" }}
      width='20%'
    >
      {isCaptain && <Armband />}
      {isViceCaptain && <Armband isVice />}
      <Box
        height='100%'
        sx={{
          backgroundImage: `url(${url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
        width='100%'
      />
      <Box
        bottom={0}
        display='flex'
        flexDirection='column'
        maxWidth='8rem'
        position='absolute'
        width='100%'
      >
        <Name />
        <Score />
      </Box>
    </Box>
  );
}
