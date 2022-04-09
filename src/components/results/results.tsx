import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { CustomResult, Fixture, Gameweek, Player, PlayerStat, Team } from "types";
import { formatDate, getTeamById } from "helpers";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import MatchDetailsModal from "./match_details_modal";

interface ResultsProps {
  teams: Team[];
  fixtures: Fixture[];
  latestGameweek: Gameweek;
  players: Player[];
  elementStats: PlayerStat[];
}

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
          variant="h5"
          key={key}
          textAlign="left"
          sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
        >
          &nbsp;&nbsp;{getTeamById(result.team_h, teams).name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flex: 0.7 }}>
        <Typography key={key} sx={{ whiteSpace: "nowrap" }} variant="h5">
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
          variant="h5"
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
