import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getFormattedDate, getTeamById, getFormattedTime } from "helpers";
import { AppData, CustomResult } from "types";

import { BaseItemWithCrest } from "./base_item_with_crest";

interface ResultProps {
  result: CustomResult;
  matchStarted: boolean;
}

export const Result = ({ result, matchStarted }: ResultProps): JSX.Element => {
  const { teams, isMobile } = useContext(AppDataContext) as AppData;

  const homeTeam = getTeamById(result.team_h, teams);
  const awayTeam = getTeamById(result.team_a, teams);

  const Score = (): JSX.Element => {
    const homeScore = result.team_h_score || 0;
    const awayScore = result.team_a_score || 0;

    return <Typography textAlign='center' width='40%'>{`${homeScore} - ${awayScore}`}</Typography>;
  };

  const KickOffDate = (): JSX.Element => {
    if (result.kickoff_time) {
      const date = new Date(result.kickoff_time);

      return (
        <Box
          className='flex-center'
          flexDirection={isMobile ? "column" : "row"}
          gap={1}
          textAlign='center'
          width='40%'
        >
          <Typography className='text-ellipsis'>{getFormattedDate(date)}</Typography>
          <Typography className='text-ellipsis'>{getFormattedTime(date)}</Typography>
        </Box>
      );
    }

    return <Typography>TBC</Typography>;
  };

  return (
    <Box className='flex-center' gap={3} width='100%'>
      <BaseItemWithCrest item={homeTeam} />
      { matchStarted ? <Score /> : <KickOffDate /> }
      <BaseItemWithCrest crestEnd item={awayTeam} />
    </Box>
  );
};
