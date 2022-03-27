import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Fixture, Gameweek, Player, Team } from "types";
import { formatDate, getTeamById } from "helpers";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import MatchDetailsModal from "./match_details_modal";

interface ResultsProps {
  teams: Team[];
  fixtures: Fixture[];
  latestGameweek: Gameweek;
  players: Player[];
}
export default function Results({
  teams,
  fixtures,
  latestGameweek,
  players,
}: ResultsProps): JSX.Element {
  const [selectedGameweek, setSelectedGameweek] = useState<number>(latestGameweek.id);
  const [gameweekFixtures, setGameweekFixtures] = useState<Fixture[]>([]);
  const [isResultsModalOpen, setResultsModalOpen] = useState<boolean>(false);
  const [selectedResult, setSelectedResult] = useState<Fixture | undefined>(undefined);

  useEffect(() => {
    const currentGameweekFixtures = fixtures.filter(
      (fixture) => fixture.event === selectedGameweek
    );
    setGameweekFixtures(currentGameweekFixtures);
  }, [fixtures, selectedGameweek]);

  const handleResultClick = (result: Fixture): void => {
    setResultsModalOpen(true);
    setSelectedResult(result);
  };

  const renderResult = (result: Fixture, matchStarted: boolean, key?: number): JSX.Element => {
    const homeTeam = getTeamById(result.team_h, teams);
    const awayTeam = getTeamById(result.team_a, teams);

    let matchStatus = "";
    if (matchStarted) {
      matchStatus = `${result.team_h_score} - ${result.team_a_score}`;
    } else if (result.kickoff_time) {
      const kickOffTime = new Date(result.kickoff_time);
      matchStatus = formatDate(kickOffTime);
    }

    return (
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
        <Grid item xs={4} display="flex" alignItems="center" justifyContent="center">
          <Typography fontSize={16} key={key}>
            {matchStatus}
          </Typography>
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
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ p: 2, pt: 3 }}
      height="100%"
      id="results-container"
      position="relative"
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton
          aria-label="prev-gameweek"
          size="medium"
          onClick={(): void => setSelectedGameweek(selectedGameweek - 1)}
          disabled={selectedGameweek <= 1}
          data-testid="prev-gameweek-btn"
        >
          <ArrowBack />
        </IconButton>
        <Typography fontSize={20} data-testid="selected-gameweek-title">
          GAMEWEEK {selectedGameweek}
        </Typography>
        <IconButton
          aria-label="prev-gameweek"
          size="medium"
          onClick={(): void => setSelectedGameweek(selectedGameweek + 1)}
          disabled={selectedGameweek >= 38}
          data-testid="next-gameweek-btn"
        >
          <ArrowForward />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ height: "100%", width: "100%" }}
        className="fixture-list-container"
      >
        {gameweekFixtures.map((result, key) => {
          const kickOffTime = new Date(result.kickoff_time || "");
          const matchStarted = kickOffTime < new Date();
          return (
            <Box
              key={key}
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="10%"
              data-testid={`result-${result.id}`}
              onClick={(): void =>
                kickOffTime < new Date() ? handleResultClick(result) : undefined
              }
              sx={{
                padding: "0 0.5em",
                borderBottom: "1px solid rgb(224, 224, 224)",
                "&:last-child": {
                  border: "none",
                },
                "&:hover": {
                  backgroundColor: matchStarted ? "rgb(224, 224, 224)" : "inherit",
                  cursor: matchStarted ? "pointer" : "default",
                },
              }}
            >
              {renderResult(result, matchStarted, key)}
            </Box>
          );
        })}
      </Box>
      {selectedResult && (
        <MatchDetailsModal
          isResultsModalOpen={isResultsModalOpen}
          setResultsModalOpen={setResultsModalOpen}
          selectedResult={selectedResult}
          renderResult={renderResult}
          players={players}
        />
      )}
    </Box>
  );
}
