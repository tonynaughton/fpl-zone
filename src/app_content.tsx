import React from "react";
import { useQuery } from "react-query";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { getAllFixtures, getGameData } from "api/fpl_api_provider";
import _ from "lodash";
import {
  AccountPage,
  AnalysisPage,
  FixturesAndResultsPage,
  GameweekLivePage,
  LoginPage,
  MyTeamPage,
  RegisterPage,
  ResetPage
} from "pages";
import PrivateRoute from "private_route";
import { AppData } from "types";

import { Logout } from "components/authentication";
import { Notifier, Startup } from "components/layout";

export const AppDataContext = React.createContext<AppData | null>(null);

export default function AppContent(): JSX.Element {
  // Fetching game data which will be made available throughout the app via context provider
  const {
    data: gameData,
    isError: gameDataIsError,
    error: gameDataError,
    isLoading: gameDataIsLoading
  } = useQuery("game-data", getGameData);

  // Fetching fixture data which will be made available throughout the app via context provider
  const {
    data: fixtureData,
    isError: fixtureDataIsError,
    error: fixtureDataError,
    isLoading: fixtureDataIsLoading
  } = useQuery("all-fixtures", getAllFixtures);

  const isCompact = useMediaQuery("(max-width:1500px)");

  const isLoading = gameDataIsLoading || fixtureDataIsLoading;
  const isError = gameDataIsError || fixtureDataIsError;
  const appData = gameData && fixtureData ? { ...gameData, fixtures: fixtureData, isCompact } : null;

  if (isLoading) {
    // Display loading message if data is still being fetched
    return (
      <Startup>
        <Notifier />
      </Startup>
    );
  } else if (isError) {
    // Display error message if data fetch failed
    const error = gameDataError || fixtureDataError;
    const errorMessage = _.isError(error) ? `: ${error.message}` : ".";

    return (
      <Startup>
        <Notifier message={`An error has occured: ${errorMessage}`} type='error' />
      </Startup>
    );
  }

  // Otherwise, render the app
  return (
    <AppDataContext.Provider value={appData}>
      <Router>
        <Routes>
          <Route element={<LoginPage />} path='*' />
          <Route element={<LoginPage />} path='/' />
          <Route element={<LoginPage />} path='/login' />
          <Route element={<RegisterPage />} path='/register' />
          <Route element={<ResetPage />} path='/reset' />
          <Route element={<Logout />} path='/logout' />
          <Route element={<PrivateRoute component={<AccountPage />} />} path='/account' />
          <Route
            element={<PrivateRoute component={<GameweekLivePage />} />}
            path='/gameweek-live'
          />
          <Route element={<PrivateRoute component={<MyTeamPage />} />} path='/my-team' />
          <Route
            element={<PrivateRoute component={<FixturesAndResultsPage />} />}
            path='/fixtures-and-results'
          />
          <Route element={<PrivateRoute component={<AnalysisPage />} />} path='/analysis' />
        </Routes>
      </Router>
    </AppDataContext.Provider>
  );

}
