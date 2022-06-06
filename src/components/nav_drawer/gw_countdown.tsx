import React from "react";
import Countdown from "react-countdown";
import { useQuery } from "react-query";
import { Box, Typography } from "@mui/material";
import { getGameData } from "api/fpl_api_provider";
import { Gameweek } from "types/gameweek";

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

  const renderer = ({ days, hours, minutes, completed }: CountdownRenderProps): JSX.Element => {
    const gameweekName = nextGameweek.name.toUpperCase();
    const daysLabel = days ? days + " day" + (days > 1 ? "s" : "") : "";
    const hoursLabel = hours ? hours + " hr" + (hours > 1 ? "s" : "") : "";
    const minsLabel = minutes ? minutes + " min" + (minutes > 1 ? "s" : "") : "";
    const countdown = [daysLabel, hoursLabel, minsLabel].join(" ");
    if (completed) {
      return (
        <Typography variant='h5'>
          {gameweekName.toUpperCase()}
          <br />
          in progress
        </Typography>
      );
    } else {
      return (
        <Typography variant='h5'>
          {gameweekName} DEADLINE:
          <br />
          {countdown.toUpperCase()}
        </Typography>
      );
    }
  };

  return (
    <Box textAlign='center' sx={{ pb: 2 }}>
      <Countdown date={deadline} renderer={renderer} />
    </Box>
  );
}
