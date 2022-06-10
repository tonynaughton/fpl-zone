/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { AppDataContext } from "app_content";
import { auth } from "config/firebase";
import { AppData } from "types";

import PlayerComparison from "components/comparison/player_comparison";
import { AppLayout, ComponentContainer } from "components/layout";

export const AnalysisPage = (): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const { playerStats, players, positions, teams } = useContext(AppDataContext) as AppData;

  const renderPlayerComparsion = (): JSX.Element => {
    return (
      <PlayerComparison
        playerStats={playerStats}
        players={players}
        positions={positions}
        teams={teams}
      />
    );
  };

  return (
    <AppLayout activeLabel='analysis' direction='row'>
      <ComponentContainer title='comparison'>{renderPlayerComparsion()}</ComponentContainer>
    </AppLayout>
  );
};
