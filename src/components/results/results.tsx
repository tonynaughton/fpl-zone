import React, { useContext, useEffect, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { AppData, CustomResult, Fixture, Gameweek } from "types";

import MatchDetailsModal from "./match_details_modal/match_details_modal";
import { RenderResult } from "./result";

export default function Results(): JSX.Element {
  const { gameweeks, fixtures } = useContext(AppDataContext) as AppData;
  const latestGameweek = gameweeks.find((gw) => gw.is_current) as Gameweek;

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
      alignItems='center'
      display='flex'
      flexDirection='column'
      height='100%'
      id='results-container'
      justifyContent='center'
      position='relative'
      sx={{ pl: 3, pr: 3, pb: 2, pt: 4 }}
    >
      <Box alignItems='center' display='flex' justifyContent='center'>
        <IconButton
          aria-label='prev-gameweek'
          data-testid='prev-gameweek-btn'
          disabled={selectedGameweek <= 1}
          onClick={(): void => setSelectedGameweek(selectedGameweek - 1)}
          size='medium'
        >
          <Tooltip title='Previous gameweek'>
            <ArrowBack />
          </Tooltip>
        </IconButton>
        <Typography data-testid='selected-gameweek-title' variant='h4'>
          GAMEWEEK {selectedGameweek}
        </Typography>
        <IconButton
          aria-label='prev-gameweek'
          data-testid='next-gameweek-btn'
          disabled={selectedGameweek >= 38}
          onClick={(): void => setSelectedGameweek(selectedGameweek + 1)}
          size='medium'
        >
          <Tooltip title='Next gameweek'>
            <ArrowForward />
          </Tooltip>
        </IconButton>
      </Box>
      <Box
        alignItems='center'
        className='fixture-list-container'
        display='flex'
        flexDirection='column'
        justifyContent='flex-start'
        sx={{ height: "100%", width: "100%" }}
      >
        {gameweekFixtures.map((result, key) => {
          const kickOffTime = new Date(result.kickoff_time || "");
          const matchStarted = kickOffTime < new Date();
          const customResult: CustomResult = {
            team_h: result.team_h,
            team_a: result.team_a,
            team_h_score: (result.team_h_score as number) || null,
            team_a_score: (result.team_a_score as number) || null,
            kickoff_time: result.kickoff_time
          };

          return (
            <Box
              alignItems='center'
              data-testid={`result-${result.id}`}
              display='flex'
              flexDirection='column'
              height='10%'
              justifyContent='center'
              key={key}
              onClick={(): void => (kickOffTime < new Date() ? handleResultClick(result) : undefined)}
              sx={{
                padding: "0 0.5em",
                borderBottom: "1px solid rgb(224, 224, 224)",
                "&:last-child": {
                  border: "none"
                },
                "&:hover": {
                  backgroundColor: matchStarted ? "rgb(224, 224, 224)" : "inherit",
                  cursor: matchStarted ? "pointer" : "default"
                }
              }}
              width='100%'
            >
              {RenderResult(customResult, matchStarted, key)}
            </Box>
          );
        })}
      </Box>
      {selectedResult && (
        <MatchDetailsModal
          isResultsModalOpen={isResultsModalOpen}
          renderResult={RenderResult}
          selectedResult={selectedResult}
          setResultsModalOpen={setResultsModalOpen}
        />
      )}
    </Box>
  );
}
