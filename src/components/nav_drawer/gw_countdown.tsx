import React, { useContext } from "react";
import Countdown from "react-countdown";
import { Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { AppData } from "types";

export const GameweekCountdown = (): JSX.Element => {
  const { gameweeks } = useContext(AppDataContext) as AppData;
  const nextGameweek = gameweeks.find(gw => gw.is_next);

  if (!nextGameweek) return <></>;

  interface CountdownRendererProps {
    days: number;
    hours: number;
    minutes: number;
    completed: boolean;
  }

  const CountdownRenderer = ({ days, hours, minutes, completed }: CountdownRendererProps): JSX.Element => {
    const gameweekName = `GW ${nextGameweek.id}`;
    const daysLabel = days ? `${days} day${days > 1 ? "s" : ""} ` : "";
    const hoursLabel = hours ? `${hours} hr${hours > 1 ? "s" : ""} ` : "";
    const minsLabel = minutes ? `${minutes} min${minutes > 1 ? "s" : ""}` : "";
    const countdown = [daysLabel, hoursLabel, minsLabel].join("");

    const text = completed
      ? `${gameweekName}\nIN PROGRESS`
      : `${gameweekName} DEADLINE:\n${countdown.toUpperCase()}`;

    return (
      <Typography
        data-testid='gameweek-deadline-text'
        p={1}
        textAlign='center'
        textOverflow='ellipsis'
        variant='h5'
        whiteSpace='pre-wrap'
        width='100%'
      >
        {text}
      </Typography>
    );
  };

  return (
    <Countdown date={nextGameweek.deadline_time} renderer={CountdownRenderer} />
  );
};
