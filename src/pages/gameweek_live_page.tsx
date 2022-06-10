import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import { auth } from "config/firebase";
import { checkGameStatus, gameStatusValues } from "helpers";
import { AppData } from "types";

import DreamTeam from "components/dream_team/dream_team";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { AppLayout, ComponentContainer, Notifier } from "components/layout";

export const GameweekLivePage = (): JSX.Element => {
  const [user, userLoading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) return;
    if (!user) return navigate("/login");
  });

  const { gameweeks } = useContext(AppDataContext) as AppData;
  const gameStatus = checkGameStatus(gameweeks);

  const renderDreamTeam = (): JSX.Element => {
    if (gameStatus === gameStatusValues.GAME_OK) {
      return <DreamTeam />;
    }

    return <Notifier message={gameStatus} />;

  };

  const renderGameweekSummary = (): JSX.Element => {
    if (gameStatus === gameStatusValues.GAME_OK) {
      return <GameweekSummary />;
    }

    return <Notifier message={gameStatus} />;

  };

  return (
    <AppLayout activeLabel='gameweek live' direction='row'>
      <Box
        alignItems='center'
        display='flex'
        gap={3}
        justifyContent='center'
        width='100%'
      >
        <Box flexGrow={1} height='100%' >
          <ComponentContainer title='dream team'>{renderDreamTeam()}</ComponentContainer>
        </Box>
        <Box flexBasis={1} height='100%' >
          <ComponentContainer title='summary'>{renderGameweekSummary()}</ComponentContainer>
        </Box>
      </Box>
    </AppLayout>
  );
};
