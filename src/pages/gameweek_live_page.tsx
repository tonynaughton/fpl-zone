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

  // FPL game gets temporarily suspended when it is updating (i.e. fetched data will be inaccurate).
  // This update takes place at the beginning of each gameweek between the deadline
  // and kick off of the first match.
  const checkGameIsUpdating = (): boolean => {
    if (currentGameweek) {
      const deadline = new Date(currentGameweek?.deadline_time);
      const timeDifference = new Date().getTime() - deadline.getTime();
      // If current time is between deadline and first match, game will be updating
      if (timeDifference < 5400000) return true;
    }
    return false;
  };

  const gameIsUpdating = checkGameIsUpdating();

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
