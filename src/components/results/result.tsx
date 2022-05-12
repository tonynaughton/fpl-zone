import React from "react";
import { Box, Typography } from "@mui/material";
import { formatDate,getTeamById } from "helpers";
import { CustomResult, Team } from "types";

export const renderResult = (
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
        display="flex"
        alignItems="center"
        overflow="hidden"
        marginRight="auto"
        flex="1"
        justifyContent="left"
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/crests/${homeTeam.code}.png`}
          alt="team-crest"
          height={30}
          width={30}
        />
        <Typography
          key={key}
          textAlign="left"
          sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
        >
          &nbsp;&nbsp;{getTeamById(result.team_h, teams).name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flex: 0.7 }}>
        <Typography key={key} sx={{ whiteSpace: "nowrap" }}>
          {matchStatus}
        </Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        overflow="hidden"
        marginLeft="auto"
        flex="1"
        justifyContent="right"
      >
        <Typography
          key={key}
          textAlign="right"
          sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
        >
          {getTeamById(result.team_a, teams).name}&nbsp;&nbsp;
        </Typography>
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/crests/${awayTeam.code}.png`}
          alt="team-crest"
          height={30}
          width={30}
        />
      </Box>
    </Box>
  );
};
