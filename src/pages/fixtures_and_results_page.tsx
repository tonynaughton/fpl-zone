import React, { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { getAllFixtures } from "api/fpl_api_provider";
import FdrTable from "components/fdr/fdr";
import AppLayout from "components/layout/app_layout";
import ComponentContainer from "components/layout/component_container";
import Error from "components/layout/error";
import Loading from "components/layout/loading";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { GameData, Gameweek } from "types";
import Results from "components/results/results";
import { GameDataContext } from "index";

export default function FixturesAndResultsPage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const gameData = useContext(GameDataContext) as GameData;

  const {
    data: fixtures,
    isLoading: fixturesLoading,
    error: fixturesError,
  } = useQuery("fixture-data", getAllFixtures);

  const currentGameweek = gameData.events.find((gw) => gw.is_current) as Gameweek;
  const currentGameweekDeadline = new Date(currentGameweek.deadline_time);
  const latestGameweek =
    currentGameweekDeadline < new Date()
      ? currentGameweek
      : (gameData?.events.find((gw) => gw.is_previous) as Gameweek);

  const renderFdrTable = (): JSX.Element => {
    return (
      <FdrTable currentGameweek={currentGameweek} type={gameData.teams} teams={gameData.teams} />
    );
  };

  const renderResults = (): JSX.Element => {
    if (fixtures) {
      return (
        <Results
          teams={gameData.teams}
          fixtures={fixtures}
          latestGameweek={latestGameweek}
          players={gameData.elements}
          elementStats={gameData.element_stats}
        />
      );
    } else if (fixturesLoading) {
      return <Loading message="Fetching fixture data.." />;
    } else {
      return <Error message="Error getting data!" />;
    }
  };

  return (
    <AppLayout activeLabel="fixtures & results" direction="row">
      <Grid container columnSpacing={4}>
        <Grid item xs={8}>
          <ComponentContainer title="fdr">{renderFdrTable()}</ComponentContainer>
        </Grid>
        <Grid item xs={4}>
          <ComponentContainer error={fixturesError} title="results">
            {renderResults()}
          </ComponentContainer>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
