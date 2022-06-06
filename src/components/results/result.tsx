import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { formatDate, getTeamById } from "helpers";
import { AppData, CustomResult, Team } from "types";

export function RenderResult (
  result: CustomResult,
  matchStarted: boolean,
  teams: Team[],
  key?: number
): JSX.Element {
  const appData = useContext(AppDataContext) as AppData;

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
          variant="h5"
          sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", ml: 1 }}
        >
          {appData.isCompact ? homeTeam.name : homeTeam.short_name }
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flex: 0.3 }}>
        <Typography variant="h5" key={key} sx={{ whiteSpace: "nowrap" }}>
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
          variant="h5"
          sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", mr: 1 }}
        >
          {appData.isCompact ? awayTeam.name : awayTeam.short_name }
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
