import React, { useContext } from "react";
import Countdown from "react-countdown";
import { Box, Typography } from "@mui/material";
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
    seconds: number;
    completed: boolean;
  }

  const CountdownRenderer = ({ days, hours, minutes, seconds, completed }: CountdownRendererProps): JSX.Element => {
    const title = completed
      ? `GAMEWEEK ${nextGameweek.id}\nIN PROGRESS`
      : `GW ${nextGameweek.id} DEADLINE:`;

    const times = {
      days: { value: days, label: "DAYS" },
      hours: { value: hours, label: "HRS" },
      minutes: { value: minutes, label: "MINS" },
      seconds: { value: seconds, label: "SECS" }
    };

    const textStyling = { fontWeight: 600, textAlign: "center" };

    return (
      <Box
        className='flex-center'
        data-testid='gameweek-deadline-container'
        flexDirection='column'
        gap={1}
        width='100%'
      >
        <Typography className='text-ellipsis' sx={textStyling}>{title}</Typography>
        { !completed &&
            <Box
              display='flex'
              gap={1}
              justifyContent='space-between'
              width='100%'
            >
              {Object.keys(times).map((time, key) => (
                <Box
                  className='flex-center'
                  flexDirection='column'
                  key={key}
                  overflow='hidden'
                  width='100%'
                >
                  <Typography sx={textStyling} variant='h5'>
                    {`0${times[time].value}`.slice(-2)}
                  </Typography>
                  <Typography sx={textStyling}>
                    {times[time].label}
                  </Typography>
                </Box>
              ))}
            </Box>}
      </Box>
    );
  };

  return (
    <Countdown date={nextGameweek.deadline_time} renderer={CountdownRenderer} />
  );
};
