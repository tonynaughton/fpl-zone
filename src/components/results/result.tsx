import React from "react";
import { Box, Typography } from "@mui/material";
import { getFormattedDate, getFormattedTime } from "helpers";
import { Team } from "types";

import { BaseItemWithCrest } from "./base_item_with_crest";

interface ResultProps {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  kickOff: Date;
}

export const Result = ({ homeTeam, awayTeam, homeScore, awayScore, kickOff }: ResultProps): JSX.Element => {
  const matchStarted = kickOff < new Date();

  const Score = (): JSX.Element => {
    return <Typography textAlign='center' width='40%'>{`${homeScore} - ${awayScore}`}</Typography>;
  };

  const KickOffDate = (): JSX.Element => {
    if (kickOff) {

      return (
        <Box
          className='flex-center'
          flexDirection='column'
          textAlign='center'
          width='40%'
        >
          <Typography className='text-ellipsis'>{getFormattedDate(kickOff)}</Typography>
          <Typography className='text-ellipsis'>{getFormattedTime(kickOff)}</Typography>
        </Box>
      );
    }

    return <Typography>TBC</Typography>;
  };

  return (
    <Box className='flex-center' gap={2.5} width='100%'>
      <BaseItemWithCrest item={homeTeam} />
      { matchStarted ? <Score /> : <KickOffDate /> }
      <BaseItemWithCrest crestEnd item={awayTeam} />
    </Box>
  );
};
