import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Fixture, Gameweek, Team } from "types";
import { getTeamById } from "helpers";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

interface ResultsProps {
  teams: Team[];
  fixtures: Fixture[];
  latestGameweek: Gameweek;
}

export default function Results({ teams, fixtures, latestGameweek }: ResultsProps): JSX.Element {
  const [selectedGameweek, setSelectedGameweek] = useState<number>(latestGameweek.id);
  const [gameweekFixtures, setGameweekFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    const currentGameweekFixtures = fixtures.filter(
      (fixture) => fixture.event === selectedGameweek
    );
    setGameweekFixtures(currentGameweekFixtures);
  }, [fixtures, selectedGameweek]);

  const renderResult = (result: Fixture, key: number): JSX.Element => {
    const homeTeam = getTeamById(result.team_h, teams);
    const awayTeam = getTeamById(result.team_a, teams);

    let resultScore: string;
    const kickOffTime = new Date(result.kickoff_time);

    if (kickOffTime < new Date()) {
      resultScore = `${result.team_h_score} - ${result.team_a_score}`;
    } else {
      const resultDate = kickOffTime;
      resultScore =
        resultDate.toLocaleDateString(navigator.language, { day: "numeric", month: "short" }) +
        " " +
        resultDate.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" });
    }

    return (
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid container>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="left" overflow="hidden">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/crests/${homeTeam.code}.png`}
                alt="team-crest"
                height={30}
                width={30}
              />
              <Typography
                fontSize={16}
                key={key}
                textAlign="left"
                sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
              >
                &nbsp;&nbsp;{getTeamById(result.team_h, teams).name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography fontSize={16} key={key}>
                {resultScore}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="right">
              <Typography
                fontSize={16}
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
          </Grid>
        </Grid>
      </Box>
    );
  };

  const fetchPreviousGameweekResults = (): void => {
    setSelectedGameweek(selectedGameweek - 1);
  };

  const fetchNextGameweekResults = (): void => {
    setSelectedGameweek(selectedGameweek + 1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 2, pt: 3 }}
      height="100%"
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton
          aria-label="prev-gameweek"
          size="medium"
          onClick={fetchPreviousGameweekResults}
          disabled={selectedGameweek <= 1}
        >
          <ArrowBack />
        </IconButton>
        <Typography fontSize={20}>GAMEWEEK {selectedGameweek}</Typography>
        <IconButton
          aria-label="prev-gameweek"
          size="medium"
          onClick={fetchNextGameweekResults}
          disabled={selectedGameweek >= 38}
        >
          <ArrowForward />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{ height: "100%", width: "100%", pl: 2, pr: 2 }}
      >
        {gameweekFixtures.map((result, key) => renderResult(result, key))}
      </Box>
    </Box>
  );
}
