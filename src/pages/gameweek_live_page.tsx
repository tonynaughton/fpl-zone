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
import { Box, CircularProgress, Typography } from "@mui/material";
import { Position } from "types/position";
import DreamTeam from "components/dream_team/dream_team";

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
  let positions: Position[] | undefined;
  let currentGameweek: Gameweek | undefined;

  if (data) {
    allGameweeks = data.events;
    allPlayers = data.elements;
    positions = data.element_types;
    currentGameweek = allGameweeks.find((gw) => gw.is_current) as Gameweek;
  }

  const renderDreamTeam = (): JSX.Element => {
    if (isLoading) {
      return <CircularProgress />;
    } else if (data && allPlayers && positions) {
      return <DreamTeam players={allPlayers} positions={positions} />;
    } else {
      return (
        <Typography textAlign="center" width="100%">
          Error getting data!
        </Typography>
      );
    }
  };

  const renderGameweekSummary = (): JSX.Element => {
    if (isLoading) {
      return <CircularProgress />;
    } else if (data && currentGameweek && allPlayers) {
      return <GameweekSummary gameweek={currentGameweek} players={allPlayers} />;
    } else {
      return <Typography>Error getting data!</Typography>;
    }
  };

  return (
    <AppLayout activeLabel="gameweek live">
      <Box
        sx={{
          height: "100%",
          maxHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          rowGap: 3,
        }}
      >
        <Box sx={{ height: "auto" }}>
          <ComponentContainer isLoading={isLoading} error={error} title="summary">
            {renderGameweekSummary()}
          </ComponentContainer>
        </Box>
        <Box sx={{ flexGrow: "1", height: "100%" }}>
          <ComponentContainer isLoading={isLoading} error={error} title="dream team">
            {renderDreamTeam()}
          </ComponentContainer>
        </Box>
      </Box>
    </AppLayout>
  );
}
