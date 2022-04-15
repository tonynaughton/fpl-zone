/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { getGameData } from "api/fpl_api_provider";
import AppLayout from "components/layout/app_layout";
import ComponentContainer from "components/layout/component_container";
import Error from "components/layout/error";
import Loading from "components/layout/loading";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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

  const allTeams = gameData?.teams;
  const players = gameData?.elements;
  const elementStats = gameData?.element_stats;
  const positions = gameData?.element_types;

  const renderPlayerComparsion = (): JSX.Element => {
    const propsAvailable = !!(players && elementStats && allTeams && positions);
    if (propsAvailable) {
      return (
        <PlayerComparison
          players={players}
          elementStats={elementStats}
          teams={allTeams}
          positions={positions}
        />
      );
    } else if (gameDataLoading) {
      return <Loading message="Fetching game data.." />;
    } else {
      return <Error message="Error getting data!" />;
    }
  };

  return (
    <AppLayout activeLabel="analysis" direction="row">
      <ComponentContainer isLoading={gameDataLoading} error={gameDataError} title="comparison">
        {renderPlayerComparsion()}
      </ComponentContainer>
    </AppLayout>
  );
}
