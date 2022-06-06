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

  const appData = useContext(AppDataContext) as AppData;

  const renderPlayerComparsion = (): JSX.Element => {
    return (
      <PlayerComparison
        players={appData.elements}
        elementStats={appData.element_stats}
        teams={appData.teams}
        positions={appData.element_types}
      />
    );
  };

  return (
    <AppLayout activeLabel='analysis' direction='row'>
      <ComponentContainer title='comparison'>{renderPlayerComparsion()}</ComponentContainer>
    </AppLayout>
  );
};
