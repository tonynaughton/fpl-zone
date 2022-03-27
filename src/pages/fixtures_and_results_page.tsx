import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { getAllFixtures, getGameData } from "api/fpl_api_provider";
import FdrTable from "components/fdr/fdr";
import AppLayout from "components/layout/app_layout";
import ComponentContainer from "components/layout/component_container";
import Error from "components/layout/error";
import Loading from "components/layout/loading";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Gameweek } from "types";
import Results from "components/results/results";

export default function FixturesAndResultsPage(): JSX.Element {
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
  const allPlayers = gameData?.elements;
  const currentGameweek = gameData?.events.find((gw) => gw.is_current) as Gameweek;
  const currentGameweekDeadline = new Date(currentGameweek?.deadline_time);
  const latestGameweek =
    currentGameweekDeadline < new Date()
      ? currentGameweek
      : (gameData?.events.find((gw) => gw.is_previous) as Gameweek);

  const renderFdrTable = (): JSX.Element => {
    if (!!gameData && !!currentGameweek && !!allTeams) {
      return <FdrTable currentGameweek={currentGameweek} type={allTeams} teams={allTeams} />;
    } else if (gameDataLoading) {
      return <Loading message="Fetching game data.." />;
    } else {
      return <Error message="Error getting data!" />;
    }
  };

  const renderResults = (): JSX.Element => {
    if (!!gameData && !!currentGameweek && !!allTeams && !!fixtures && !!allPlayers) {
      return (
        <Results
          teams={allTeams}
          fixtures={fixtures}
          latestGameweek={latestGameweek}
          players={allPlayers}
        />
      );
    } else if (fixturesLoading) {
      return <Loading message="Fetching game data.." />;
    } else {
      return <Error message="Error getting data!" />;
    }
  };

  return (
    <AppLayout activeLabel="fixtures & results" direction="row">
      <Grid container columnSpacing={4}>
        <Grid item xs={8}>
          <ComponentContainer isLoading={gameDataLoading} error={gameDataError} title="fdr">
            {renderFdrTable()}
          </ComponentContainer>
        </Grid>
        <Grid item xs={4}>
          <ComponentContainer isLoading={gameDataLoading} error={fixturesError} title="results">
            {renderResults()}
          </ComponentContainer>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
