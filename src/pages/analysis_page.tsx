/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import AppLayout from "components/layout/app_layout";
import ComponentContainer from "components/layout/component_container";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import PlayerComparison from "components/comparison/player_comparison";
import { GameData } from "types";
import { GameDataContext } from "index";

export default function AnalysisPage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const gameData = useContext(GameDataContext) as GameData;

  const renderPlayerComparsion = (): JSX.Element => {
    return (
      <PlayerComparison
        players={gameData.elements}
        elementStats={gameData.element_stats}
        teams={gameData.teams}
        positions={gameData.element_types}
      />
    );
  };

  return (
    <AppLayout activeLabel="analysis" direction="row">
      <ComponentContainer title="comparison">{renderPlayerComparsion()}</ComponentContainer>
    </AppLayout>
  );
}
