import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "config/firebase";
import AppLayout from "components/layout/app_layout";
import { Box, Container } from "@mui/material";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { useQuery } from "react-query";
import { getGameData } from "api/fpl_api_provider";
import { Gameweek } from "types/gameweek";

export default function GameweekLivePage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const { data, isError } = useQuery("game-data", getGameData);

  if (isError || !data) return <></>;

  const gameweeks: Gameweek[] = data.events;
  const currentGameweek: Gameweek = gameweeks.find((gw) => gw.is_current) as Gameweek;

  return (
    <AppLayout activeLabel="gameweek live">
      <Container maxWidth="xl">
        <Box width="100%" border="1px solid black">
          <GameweekSummary gameweek={currentGameweek} />
        </Box>
      </Container>
    </AppLayout>
  );
}
