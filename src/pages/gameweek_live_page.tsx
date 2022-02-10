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
import Lineup from "components/lineup/lineup";
import { Grid } from "@mui/material";
import { Position } from "types/position";

export default function GameweekLivePage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const { data: gameData } = useQuery("game-data", getGameData);

  let allGameweeks: Gameweek[];
  let allPlayers: Player[] | undefined;
  let positions: Position[] | undefined;
  let currentGameweek: Gameweek | undefined;

  if (gameData) {
    allGameweeks = gameData.events;
    allPlayers = gameData.elements;
    positions = gameData.element_types;
    currentGameweek = allGameweeks.find((gw) => gw.is_current) as Gameweek;
  }

  return (
    <AppLayout activeLabel="gameweek live">
      <Grid container rowGap={5}>
        <Grid item xs={12}>
          <ComponentContainer title="summary">
            <GameweekSummary gameweek={currentGameweek} players={allPlayers} />
          </ComponentContainer>
        </Grid>
        <Grid item xs={12}>
          <ComponentContainer title="dream team">
            <Lineup gameweek={currentGameweek} players={allPlayers} positions={positions} />
          </ComponentContainer>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
