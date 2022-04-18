import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "config/firebase";
import { AppLayout, ComponentContainer, LoadingMessage } from "components/layout";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { Grid } from "@mui/material";
import DreamTeam from "components/dream_team/dream_team";
import { AppData, Gameweek } from "types";
import { checkGameUpdatingStatus } from "helpers";
import { AppDataContext } from "app_content";

export function GameweekLivePage(): JSX.Element {
  const [user, userLoading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) return;
    if (!user) return navigate("/login");
  });

  const appData = useContext(AppDataContext) as AppData;

  const allGameweeks = appData.gameData.events;
  const allPlayers = appData.gameData.elements;
  const currentGameweek = allGameweeks.find((gw) => gw.is_current) as Gameweek;
  const gameIsUpdating = checkGameUpdatingStatus(appData.gameData.events);

  const renderDreamTeam = (): JSX.Element => {
    if (gameIsUpdating) {
      return <LoadingMessage message="Game is updating.." />;
    } else {
      return <DreamTeam />;
    }
  };

  const renderGameweekSummary = (): JSX.Element => {
    if (gameIsUpdating) {
      return <LoadingMessage message="Game is updating.." />;
    } else {
      return <GameweekSummary gameweek={currentGameweek} players={allPlayers} />;
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
