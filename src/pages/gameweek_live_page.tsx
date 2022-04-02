import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "config/firebase";
import AppLayout from "components/layout/app_layout";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { useQuery } from "react-query";
import { getGameData } from "api/fpl_api_provider";
import { Gameweek } from "types/gameweek";
import { Player } from "types/player";
import ComponentContainer from "components/layout/component_container";
import { Grid, Typography } from "@mui/material";
import { Position } from "types/position";
import DreamTeam from "components/dream_team/dream_team";
import Loading from "components/layout/loading";
import Error from "components/layout/error";
import { PlayerStat, Team } from "types";

export default function GameweekLivePage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const { data, isLoading, error } = useQuery("game-data", getGameData);

  let allGameweeks: Gameweek[];
  let allPlayers: Player[] | undefined;
  let allTeams: Team[];
  let positions: Position[] | undefined;
  let currentGameweek: Gameweek | undefined;
  let elementStats: PlayerStat[];

  if (data) {
    allGameweeks = data.events;
    allPlayers = data.elements;
    allTeams = data.teams;
    positions = data.element_types;
    currentGameweek = allGameweeks.find((gw) => gw.is_current) as Gameweek;
    elementStats = data.element_stats;
  }

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
    } else if (isLoading) {
      return <Loading message="Fetching game data data.." />;
    } else if (data && allPlayers && positions && elementStats) {
      return (
        <DreamTeam
          players={allPlayers}
          positions={positions}
          elementStats={elementStats}
          teams={allTeams}
        />
      );
    } else {
      return <Error message="Error getting data!" />;
    }
  };

  const renderGameweekSummary = (): JSX.Element => {
    if (gameIsUpdating) {
      return <Loading message="Game is updating.." />;
    } else if (isLoading) {
      return <Loading message="Fetching game data.." />;
    } else if (data && currentGameweek && allPlayers) {
      return <GameweekSummary gameweek={currentGameweek} players={allPlayers} />;
    } else {
      return <Typography>Error getting data!</Typography>;
    }
  };

  return (
    <AppLayout activeLabel="gameweek live" direction="row">
      <Grid container columnSpacing={4}>
        <Grid item xs={9}>
          <ComponentContainer isLoading={isLoading} error={error} title="dream team">
            {renderDreamTeam()}
          </ComponentContainer>
        </Grid>
        <Grid item xs={3}>
          <ComponentContainer isLoading={isLoading} error={error} title="summary">
            {renderGameweekSummary()}
          </ComponentContainer>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
