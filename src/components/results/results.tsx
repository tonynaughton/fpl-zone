import React from "react";
import { Box, Typography } from "@mui/material";
import { Fixture, Gameweek, Team } from "types";
import { getTeamById } from "helpers";

interface ResultsProps {
  teams: Team[];
  fixtures: Fixture[];
  latestGameweek: Gameweek;
}

export default function Results({ teams, fixtures, latestGameweek }: ResultsProps): JSX.Element {
  console.log("🚀 ~ file: results.tsx ~ line 11 ~ Results ~ latestGameweek", latestGameweek);
  console.log("🚀 ~ file: results.tsx ~ line 10 ~ Results ~ fixtures", fixtures);
  console.log("🚀 ~ file: results.tsx ~ line 10 ~ Results ~ teams", teams);

  const gameweekFixtures = fixtures.filter((fixture) => fixture.event === latestGameweek.id);
  console.log("🚀 ~ file: results.tsx ~ line 17 ~ Results ~ gameweekFixtures", gameweekFixtures);

  const renderResult = (result: Fixture, key: number): JSX.Element => {
    return (
      <Box>
        <Typography fontSize={16} key={key}>
          {getTeamById(result.team_h, teams).name}&nbsp;
          {result.team_h_score} - {result.team_a_score}&nbsp;
          {getTeamById(result.team_a, teams).name}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 2, pt: 7 }}
      height="100%"
    >
      <Typography fontSize={20}>{latestGameweek.name.toUpperCase()} RESULTS</Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        sx={{ height: "100%" }}
        flexGrow="true"
      >
        {gameweekFixtures.map((result, key) => renderResult(result, key))}
      </Box>
    </Box>
  );
}
