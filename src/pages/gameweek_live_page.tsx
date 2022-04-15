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
import { GameData } from "types";
import { GameDataContext } from "index";

export default function GameweekLivePage(): JSX.Element {
  const [user, userLoading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) return;
    if (!user) return navigate("/login");
  });

  const gameData = useContext(GameDataContext) as GameData;

  const allGameweeks = gameData.events;
  const allPlayers = gameData.elements;
  const allTeams = gameData.teams;
  const positions = gameData.element_types;
  const currentGameweek = allGameweeks.find((gw) => gw.is_current) as Gameweek;
  const elementStats = gameData.element_stats;

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
          players={allPlayers}
          positions={positions}
          elementStats={elementStats}
          teams={allTeams}
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
