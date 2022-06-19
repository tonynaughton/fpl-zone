import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { formatDate, getLocalImage, getTeamById } from "helpers";
import { AppData, CustomResult } from "types";

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
    <Box className='flex-center' width='100%'>
      <Box
        alignItems='center'
        display='flex'
        flexBasis='40%'
        gap={1}
        justifyContent='left'
        marginRight='auto'
        overflow='hidden'
      >
        <img
          alt='team-crest'
          height={30}
          src={getLocalImage(`crests/${homeTeam.code}.png`)}
          width={30}
        />
        <Typography className='text-ellipsis' textAlign='left'>
          {homeTeam.name.toUpperCase()}
        </Typography>
      </Box>
      <Box className='flex-center' flexBasis='20%' overflow='hidden'>
        <Typography variant='h5' whiteSpace='nowrap'>{matchStatus}</Typography>
      </Box>
      <Box
        alignItems='center'
        display='flex'
        flexBasis='40%'
        gap={1}
        justifyContent='right'
        marginLeft='auto'
        overflow='hidden'
      >
        <Typography
          className='text-ellipsis'
          textAlign='right'
        >
          {awayTeam.name.toUpperCase()}
        </Typography>
        <img
          alt='team-crest'
          height={30}
          src={getLocalImage(`crests/${awayTeam.code}.png`)}
          width={30}
        />
      </Box>
    </Box>
  );
};
