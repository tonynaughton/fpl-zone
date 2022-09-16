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

  return (
    <Box
      className='flex-center'
      flexDirection='column'
      height='100%'
      overflow='hidden'
      pb={2}
      position='relative'
      pt={isMobile ? 2 : 6}
      px={2}
      width='100%'
    >
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
      <Box
        alignItems='center'
        display='flex'
        flexDirection='column'
        flexGrow={1}
        width='100%'
      >
        { isEmpty(gameweekFixtures)
          ? (
            <Notifier message='No fixtures' type='warning' />
          )
          : (
            gameweekFixtures.map((fixture, key) => <ResultContainer fixture={fixture} key={key} onFixtureClick={handleFixtureClick} />)
          )}
      </Box>
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
