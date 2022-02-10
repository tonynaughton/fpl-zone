import React from "react";
import { getGameData } from "api/fpl_api_provider";
import { useQuery } from "react-query";
import { Gameweek } from "types/gameweek";
import Countdown from "react-countdown";
import { Box, Typography } from "@mui/material";

export default function GameweekCountdown(): JSX.Element {
  const { data, isError } = useQuery("game-data", getGameData);

  if (isError || !data) return <></>;

  const gameweeks: Gameweek[] = data.events;
  const nextGameweek: Gameweek | undefined = gameweeks.find((gw) => {
    return gw.is_next;
  });

  if (!nextGameweek) return <></>;

  const deadline = nextGameweek.deadline_time;

  interface CountdownRenderProps {
    days: number;
    hours: number;
    minutes: number;
    completed: boolean;
  }

  const renderer = ({ days, hours, minutes, completed }: CountdownRenderProps) => {
    const gameweekName = nextGameweek.name.toUpperCase();
    if (completed) {
      return (
        <Typography>
          {gameweekName}
          <br />
          IN PROGRESS
        </Typography>
      );
    } else {
      return (
        <Typography>
          {gameweekName} DEADLINE
          <br />
          {days} DAYS {hours} HRS {minutes} MINS
        </Typography>
      );
    }
  };

  return (
    <Box textAlign="center" sx={{ pb: 2 }}>
      <Countdown date={deadline} renderer={renderer} />
    </Box>
  );
}