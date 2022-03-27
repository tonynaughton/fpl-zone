import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Fixture, Gameweek, Goalscorer, Player, Team } from "types";
import { formatDate, GetPlayerById, getTeamById } from "helpers";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";

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

  const renderResult = (result: Fixture, key?: number): JSX.Element => {
    const homeTeam = getTeamById(result.team_h, teams);
    const awayTeam = getTeamById(result.team_a, teams);

    let resultScore: string;
    const kickOffTime = new Date(result.kickoff_time || "");

    if (kickOffTime < new Date()) {
      resultScore = `${result.team_h_score} - ${result.team_a_score}`;
    } else {
      resultScore = formatDate(kickOffTime);
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
            {resultScore}
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

  const renderGoalscorers = (goalscorers: Goalscorer[], isAway = false): JSX.Element => {
    return (
      <>
        {goalscorers.map((goalscorer, key) => (
          <Box
            display="flex"
            justifyContent={isAway ? "right" : "left"}
            flexDirection={isAway ? "row" : "row-reverse"}
            key={key}
          >
            <Typography>
              {GetPlayerById(goalscorer.element, players).web_name}
              {goalscorer.value > 1 ? ` (${goalscorer.value})` : ""}
            </Typography>
            &nbsp;&nbsp;
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/football.png`}
              alt="football"
              height={20}
              width={20}
            />
          </Box>
        ))}
      </>
    );
  };

  // Custom modal used as MUI Modal component was causing positioning issues
  const renderResultModal = (): JSX.Element => {
    const goalsScored = selectedResult?.stats.find((stat) => stat.identifier === "goals_scored");
    return selectedResult ? (
      <Box
        sx={{
          display: isResultsModalOpen ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgb(0, 0, 0, 0.5)",
        }}
        onClick={(): void => setResultsModalOpen(false)}
      >
        <Box
          sx={{
            display: isResultsModalOpen ? "flex" : "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            flexDirection: "column",
            alignItems: "center",
            rowGap: "1em",
            zIndex: 2000,
          }}
          // https://stackoverflow.com/questions/49637047/prevent-onclick-from-firing-if-another-element-is-on-top
          onClick={(event): void => event.stopPropagation()}
        >
          <IconButton
            onClick={(): void => setResultsModalOpen(false)}
            sx={{ position: "absolute", top: "12px", right: "12px" }}
          >
            <Close />
          </IconButton>
          {selectedResult.kickoff_time && (
            <Typography>{formatDate(new Date(selectedResult.kickoff_time))}</Typography>
          )}
          {renderResult(selectedResult)}
          {goalsScored && (
            <Grid container sx={{ pt: 2, borderTop: "1px solid gray" }}>
              <Grid item xs={6}>
                {renderGoalscorers(goalsScored.h)}
              </Grid>
              <Grid item xs={6}>
                {renderGoalscorers(goalsScored.a, true)}
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    ) : (
      <></>
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
      id="results-container"
      position="relative"
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton
          aria-label="prev-gameweek"
          size="medium"
          onClick={fetchPreviousGameweekResults}
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
          onClick={fetchNextGameweekResults}
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
              onClick={(): void => (matchStarted ? handleResultClick(result) : undefined)}
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
              {renderResult(result, key)}
            </Box>
          );
        })}
      </Box>
      {renderResultModal()}
    </Box>
  );
}
