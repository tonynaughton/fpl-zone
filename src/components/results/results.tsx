import React, { useContext, useEffect, useState } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { isEmpty } from "lodash";
import { AppData, Fixture } from "types";

import { Notifier } from "components/layout";

import FixtureDetailsModal from "./match_details_modal/match_details_modal";
import { ResultContainer } from "./result_container";

export default function Results(): JSX.Element {
  const { gameweeks, fixtures, isMobile } = useContext(AppDataContext) as AppData;

  const currentGameweek = gameweeks.find((gw) => gw.is_current);

  const [selectedGameweek, setSelectedGameweek] = useState<number>(currentGameweek?.id || 1);
  const [gameweekFixtures, setGameweekFixtures] = useState<Fixture[]>([]);
  const [isResultsModalOpen, setResultsModalOpen] = useState<boolean>(false);
  const [selectedFixture, setSelectedResult] = useState<Fixture | null>(null);

  useEffect(() => {
    const currentGameweekFixtures = fixtures.filter(
      (fixture) => fixture.event === selectedGameweek
    );
    setGameweekFixtures(currentGameweekFixtures);
  }, [fixtures, selectedGameweek]);

  const handleFixtureClick = (fixture: Fixture): void => {
    setResultsModalOpen(true);
    setSelectedResult(fixture);
  };

  const closeResultsModal = (): void => setResultsModalOpen(false);

  const onPrevGameweekClick = (): void => setSelectedGameweek(selectedGameweek - 1);
  const onNextGameweekClick = (): void => setSelectedGameweek(selectedGameweek + 1);

  const GameweekNavigator = (): JSX.Element => {
    return (
      <Box className='flex-center' overflow='hidden' width='100%'>
        <IconButton
          data-testid='prev-gameweek-btn'
          disabled={selectedGameweek <= 1}
          onClick={onPrevGameweekClick}
          size='medium'
        >
          <Tooltip title='Previous gameweek'>
            <ArrowBack />
          </Tooltip>
        </IconButton>
        <Typography className='text-ellipsis' data-testid='selected-gameweek-title' variant='h5'>
          GAMEWEEK {selectedGameweek}
        </Typography>
        <IconButton
          data-testid='next-gameweek-btn'
          disabled={selectedGameweek >= 38}
          onClick={onNextGameweekClick}
          size='medium'
        >
          <Tooltip title='Next gameweek'>
            <ArrowForward />
          </Tooltip>
        </IconButton>
      </Box>
    );
  };

  const GameweekFixtures = (): JSX.Element => {
    if (isEmpty(gameweekFixtures)) {
      return <Notifier message='No fixtures' type='warning' />;
    }

    return (
      <Box
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='space-evenly'
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
        width='100%'
      >
        {gameweekFixtures.map((fixture, key) => (
          <ResultContainer
            fixture={fixture}
            key={key}
            onFixtureClick={handleFixtureClick}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='center'
      overflow='hidden'
      pt={isMobile ? 3 : 6}
      width='100%'
    >
      <GameweekNavigator />
      <GameweekFixtures />
      {selectedFixture && (
        <FixtureDetailsModal
          closeFixtureDetailsModal={closeResultsModal}
          fixture={selectedFixture}
          isFixtureDetailsModalOpen={isResultsModalOpen}
        />
      )}
    </Box>
  );
}
