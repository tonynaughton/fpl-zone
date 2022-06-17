import React from "react";
import { Box, Typography } from "@mui/material";
import { formatDate, getTeamById } from "helpers";
import { CustomResult, Team } from "types";

export const RenderResult = (
  result: CustomResult,
  matchStarted: boolean,
  teams: Team[],
  key?: number
): JSX.Element => {
  const homeTeam = getTeamById(result.team_h, teams);
  const awayTeam = getTeamById(result.team_a, teams);

  let matchStatus = "";
  if (matchStarted) {
    matchStatus = `${result.team_h_score || 0} - ${result.team_a_score || 0}`;
  } else if (result.kickoff_time) {
    const kickOffTime = new Date(result.kickoff_time);
    matchStatus = formatDate(kickOffTime);
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%", columnGap: 4 }}>
      <Box
        alignItems='center'
        display='flex'
        flex='1'
        justifyContent='left'
        marginRight='auto'
        overflow='hidden'
      >
        <img
          alt='team-crest'
          height={30}
          src={`${process.env.PUBLIC_URL}/assets/images/crests/${homeTeam.code}.png`}
          width={30}
        />
        <Typography
          key={key}
          sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", ml: 1 }}
          textAlign='left'
        >
          {homeTeam.name.toUpperCase()}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flex: 0.3 }}>
        <Typography key={key} sx={{ whiteSpace: "nowrap" }} variant='h5'>
          {matchStatus}
        </Typography>
      </Box>
      <Box
        alignItems='center'
        display='flex'
        flex='1'
        justifyContent='right'
        marginLeft='auto'
        overflow='hidden'
      >
        <Typography
          key={key}
          sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", mr: 1 }}
          textAlign='right'
        >
          {awayTeam.name.toUpperCase()}
        </Typography>
        <img
          alt='team-crest'
          height={30}
          src={`${process.env.PUBLIC_URL}/assets/images/crests/${awayTeam.code}.png`}
          width={30}
        />
      </Box>
    </Box>
  );
};
