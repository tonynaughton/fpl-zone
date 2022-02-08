import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "config/firebase";
import AppLayout from "components/layout/app_layout";
import { Box, Container } from "@mui/material";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { useQuery } from "react-query";
import { getGameData, getTeamData } from "api/fpl_api_provider";
import { Gameweek } from "types/gameweek";
import { Player } from "types/player";
import { GetPlayerById } from "helpers";
import { Team } from "types/team";

export default function GameweekLivePage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const { data: gameData } = useQuery("game-data", getGameData);

  let gameweeks: Gameweek[];
  let players: Player[];
  let currentGameweek: Gameweek | undefined;
  let starPlayer: Player | undefined;

  if (gameData) {
    gameweeks = gameData.events;
    players = gameData.elements;
    currentGameweek = gameweeks.find((gw) => gw.is_current) as Gameweek;
    starPlayer = GetPlayerById(currentGameweek.top_element_info.id, players);
  }

  const topTeamId = currentGameweek?.highest_scoring_entry;
  const { data: topTeam } = useQuery<Team, Error>(
    ["top-team", topTeamId],
    () => getTeamData(topTeamId),
    {
      enabled: !!topTeamId,
    }
  );

  return (
    <AppLayout activeLabel="gameweek live">
      <Container maxWidth="xl">
        <Box width="100%" border="1px solid black">
          <GameweekSummary gameweek={currentGameweek} starPlayer={starPlayer} topTeam={topTeam} />
        </Box>
      </Container>
    </AppLayout>
  );
}
