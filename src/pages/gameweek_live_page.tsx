import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { AppDataContext } from "app_content";
import { auth } from "config/firebase";
import { checkGameStatus, gameStatusValues } from "helpers";
import { AppData } from "types";

import DreamTeam from "components/dream_team/dream_team";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { AppLayout, ComponentContainer, Notifier } from "components/layout";

export function GameweekLivePage(): JSX.Element {
  const [user, userLoading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) return;
    if (!user) return navigate("/login");
  });

  const appData = useContext(AppDataContext) as AppData;
  const gameStatus = checkGameStatus(appData.events);

  const renderDreamTeam = (): JSX.Element => {
    if (gameStatus === gameStatusValues.GAME_OK) {
      return <DreamTeam />;
    } else {
      return <Notifier message={gameStatus} />;
    }
  };

  const renderGameweekSummary = (): JSX.Element => {
    if (gameStatus === gameStatusValues.GAME_OK) {
      return <GameweekSummary />;
    } else {
      return <Notifier message={gameStatus} />;
    }
  };

  return (
    <AppLayout activeLabel="gameweek live" direction="row">
      <Grid container columnSpacing={4}>
        <Grid item xs={9}>
          <ComponentContainer title="dream team">{renderDreamTeam()}</ComponentContainer>
        </Grid>
        <Grid item xs={3}>
          <ComponentContainer title="summary">{renderGameweekSummary()}</ComponentContainer>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
