import React, { useContext, useEffect, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { AppData, CustomResult, Fixture } from "types";

import MatchDetailsModal from "./match_details_modal/match_details_modal";
import { Result } from "./result";

export default function Results(): JSX.Element {
  const { gameweeks, fixtures } = useContext(AppDataContext) as AppData;
  const theme = useTheme();

  const currentGameweek = gameweeks.find((gw) => gw.is_current);

  const [selectedGameweek, setSelectedGameweek] = useState<number>(currentGameweek?.id || 1);
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
      className='flex-center'
      flexDirection='column'
      height='100%'
      position='relative'
      sx={{ pl: 3, pr: 3, pb: 2, pt: 4 }}
    >
      <Box className='flex-center' overflow='hidden' width='100%'>
        <IconButton
          data-testid='prev-gameweek-btn'
          disabled={selectedGameweek <= 1}
          onClick={(): void => setSelectedGameweek(selectedGameweek - 1)}
          size='medium'
        >
          <Tooltip title='Previous gameweek'>
            <ArrowBack />
          </Tooltip>
        </IconButton>
        <Typography className='text-ellipsis' data-testid='selected-gameweek-title' variant='h4'>
          GAMEWEEK {selectedGameweek}
        </Typography>
        <IconButton
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
        display='flex'
        flexDirection='column'
        flexGrow={1}
        width='100%'
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
              borderBottom='1px solid rgb(224, 224, 224)'
              className='flex-center'
              data-testid={`result-${result.id}`}
              flexGrow={1}
              key={key}
              onClick={(): void => (kickOffTime < new Date() ? handleResultClick(result) : undefined)}
              padding='0.5vw'
              sx={{
                "&:last-child": { border: "none" },
                "&:hover": {
                  bgcolor: matchStarted ? theme.palette.highlight.main : "inherit",
                  cursor: matchStarted ? "pointer" : "default"
                }
              }}
              width='100%'
            >
              <Result result={customResult} started={matchStarted} />
            </Box>
          );
        })}
      </Box>
      {selectedResult && (
        <MatchDetailsModal
          isResultsModalOpen={isResultsModalOpen}
          selectedResult={selectedResult}
          setResultsModalOpen={setResultsModalOpen}
        />
      )}
    </Box>
  );
}
