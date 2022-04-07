/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { getAllFixtures, getGameData } from "api/fpl_api_provider";
import AppLayout from "components/layout/app_layout";
import ComponentContainer from "components/layout/component_container";
import Error from "components/layout/error";
import Loading from "components/layout/loading";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Gameweek } from "types";
import PlayerComparison from "components/comparison/player_comparison";

export default function AnalysisPage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const {
    data: gameData,
    isLoading: gameDataLoading,
    error: gameDataError,
  } = useQuery("game-data", getGameData);

  const {
    data: fixtures,
    isLoading: fixturesLoading,
    error: fixturesError,
  } = useQuery("fixture-data", getAllFixtures);

  const allTeams = gameData?.teams;
  const players = gameData?.elements;
  const elementStats = gameData?.element_stats;
  const currentGameweek = gameData?.events.find((gw) => gw.is_current) as Gameweek;
  const currentGameweekDeadline = new Date(currentGameweek?.deadline_time);
  const latestGameweek =
    currentGameweekDeadline < new Date()
      ? currentGameweek
      : (gameData?.events.find((gw) => gw.is_previous) as Gameweek);

  const renderPlayerComparsion = (): JSX.Element => {
    const propsAvailable = !!(players && fixtures && elementStats && latestGameweek && allTeams);
    if (propsAvailable) {
      return (
        <PlayerComparison
          gameweek={latestGameweek}
          players={players}
          fixtures={fixtures}
          elementStats={elementStats}
          teams={allTeams}
        />
      );
    } else if (gameDataLoading || fixturesLoading) {
      return <Loading message="Fetching game data.." />;
    } else {
      return <Error message="Error getting data!" />;
    }
  };

  return (
    <AppLayout activeLabel="analysis" direction="row">
      <ComponentContainer
        isLoading={gameDataLoading}
        error={gameDataError || fixturesError}
        title="comparison"
      >
        {renderPlayerComparsion()}
      </ComponentContainer>
    </AppLayout>
  );
}
