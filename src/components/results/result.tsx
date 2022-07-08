import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { formatDate, getTeamById } from "helpers";
import { AppData, CustomResult } from "types";

import { BaseItemWithCrest } from "./base_item_with_crest";

interface ResultProps {
  result: CustomResult;
  started: boolean;
}

export const Result = ({ result, started }: ResultProps): JSX.Element => {
  const { teams } = useContext(AppDataContext) as AppData;

  const homeTeam = getTeamById(result.team_h, teams);
  const awayTeam = getTeamById(result.team_a, teams);

  let matchStatus = "";
  if (started) {
    matchStatus = `${result.team_h_score || 0} - ${result.team_a_score || 0}`;
  } else if (result.kickoff_time) {
    const kickOffTime = new Date(result.kickoff_time);
    matchStatus = formatDate(kickOffTime);
  }

  return (
    <Box className='flex-center' gap={3} width='100%'>
      <BaseItemWithCrest item={homeTeam} />
      <Typography textAlign='center' width='40%'>{matchStatus.toUpperCase()}</Typography>
      <BaseItemWithCrest crestEnd item={awayTeam} />
    </Box>
  );
};
