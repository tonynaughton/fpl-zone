import React, { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import FdrTable from "components/fdr/fdr";
import AppLayout from "components/layout/app_layout";
import ComponentContainer from "components/layout/component_container";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Gameweek, AppData } from "types";
import Results from "components/results/results";
import { AppDataContext } from "index";

export default function FixturesAndResultsPage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const appData = useContext(AppDataContext) as AppData;

  const currentGameweek = appData.gameData.events.find((gw) => gw.is_current) as Gameweek;
  const currentGameweekDeadline = new Date(currentGameweek.deadline_time);
  const latestGameweek =
    currentGameweekDeadline < new Date()
      ? currentGameweek
      : (appData.gameData.events.find((gw) => gw.is_previous) as Gameweek);

  const renderFdrTable = (): JSX.Element => {
    return (
      <FdrTable
        currentGameweek={currentGameweek}
        type={appData.gameData.teams}
        teams={appData.gameData.teams}
      />
    );
  };

  const renderResults = (): JSX.Element => {
    return (
      <Results
        teams={appData.gameData.teams}
        fixtures={appData.fixtureData}
        latestGameweek={latestGameweek}
        players={appData.gameData.elements}
        elementStats={appData.gameData.element_stats}
      />
    );
  };

  return (
    <AppLayout activeLabel="fixtures & results" direction="row">
      <Grid container columnSpacing={4}>
        <Grid item xs={8}>
          <ComponentContainer title="fdr">{renderFdrTable()}</ComponentContainer>
        </Grid>
        <Grid item xs={4}>
          <ComponentContainer title="results">{renderResults()}</ComponentContainer>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
