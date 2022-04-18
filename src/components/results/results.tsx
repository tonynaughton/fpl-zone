import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { CustomResult, Fixture, Gameweek, Player, PlayerStat, Team } from "types";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import MatchDetailsModal from "./match_details_modal";
import { renderResult } from "./result";

interface ResultsProps {
  teams: Team[];
  fixtures: Fixture[];
  latestGameweek: Gameweek;
  players: Player[];
  elementStats: PlayerStat[];
}

export default function Results({
  teams,
  fixtures,
  latestGameweek,
  players,
  elementStats,
}: ResultsProps): JSX.Element {
  const [selectedGameweek, setSelectedGameweek] = useState<number>(latestGameweek.id);
  const [gameweekFixtures, setGameweekFixtures] = useState<Fixture[]>([]);
  const [isResultsModalOpen, setResultsModalOpen] = useState<boolean>(false);
  const [selectedResult, setSelectedResult] = useState<Fixture | null>(null);

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
          <Tooltip title="Previous gameweek">
            <ArrowBack />
          </Tooltip>
        </IconButton>
        <Typography variant="h6" data-testid="selected-gameweek-title">
          GAMEWEEK {selectedGameweek}
        </Typography>
        <IconButton
          aria-label="prev-gameweek"
          size="medium"
          onClick={(): void => setSelectedGameweek(selectedGameweek + 1)}
          disabled={selectedGameweek >= 38}
          data-testid="next-gameweek-btn"
        >
          <Tooltip title="Next gameweek">
            <ArrowForward />
          </Tooltip>
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
          const customResult: CustomResult = {
            team_h: result.team_h,
            team_a: result.team_a,
            team_h_score: (result.team_h_score as number) || null,
            team_a_score: (result.team_a_score as number) || null,
            kickoff_time: result.kickoff_time,
          };

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
              {renderResult(customResult, matchStarted, teams, key)}
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
          elementStats={elementStats}
          allTeams={teams}
        />
      )}
    </Box>
  );
}
