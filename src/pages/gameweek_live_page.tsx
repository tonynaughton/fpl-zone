import React, { useContext } from "react";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import { checkGameStatus, GAME_STATUS_VALUES } from "helpers";
import { AppData } from "types";

import DreamTeam from "components/dream_team/dream_team";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { AppLayout, ComponentContainer, Notifier } from "components/layout";

export const GameweekLivePage = (): JSX.Element => {
  const { gameweeks } = useContext(AppDataContext) as AppData;
  const gameStatus = checkGameStatus(gameweeks);

  const renderDreamTeam = (): JSX.Element => {
    if (gameStatus === GAME_STATUS_VALUES.GAME_OK) {
      return <DreamTeam />;
    }

    return <Notifier message={gameStatus} />;

  };

  const renderGameweekSummary = (): JSX.Element => {
    if (gameStatus === GAME_STATUS_VALUES.GAME_OK) {
      return <GameweekSummary />;
    }

    return <Notifier message={gameStatus} />;

  };

  return (
    <AppLayout active='gameweek live' direction='row'>
      <Box
        className='flex-center'
        gap={3}
        minWidth={0}
        width='100%'
      >
        <Box flexBasis='70%' height='100%' minWidth={0}>
          <ComponentContainer title='dream team'>{renderDreamTeam()}</ComponentContainer>
        </Box>
        <Box flexBasis='30%' height='100%' minWidth={0}>
          <ComponentContainer title='summary'>{renderGameweekSummary()}</ComponentContainer>
        </Box>
      </Box>
    </AppLayout>
  );
};
