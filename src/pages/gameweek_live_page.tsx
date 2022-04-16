import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "config/firebase";
import AppLayout from "components/layout/app_layout";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { Gameweek } from "types/gameweek";
import ComponentContainer from "components/layout/component_container";
import { Grid } from "@mui/material";
import DreamTeam from "components/dream_team/dream_team";
import Loading from "components/layout/loading";
import { AppDataContext } from "index";
import { AppData } from "types/app_data";
import { checkGameUpdatingStatus } from "helpers";

export default function GameweekLivePage(): JSX.Element {
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
      return <Loading message="Game is updating.." />;
    } else {
      return (
        <DreamTeam
          players={appData.gameData.elements}
          positions={appData.gameData.element_types}
          elementStats={appData.gameData.element_stats}
          teams={appData.gameData.teams}
        />
      );
    }
  };

  const renderGameweekSummary = (): JSX.Element => {
    if (gameIsUpdating) {
      return <Loading message="Game is updating.." />;
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
