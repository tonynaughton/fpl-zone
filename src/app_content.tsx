import React from "react";
import { Logout } from "@mui/icons-material";
import { Box } from "@mui/material";
import { LoadingMessage, ErrorMessage, Startup } from "components/layout";
import PrivateRoute from "private_route";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllFixtures, getGameData } from "api/fpl_api_provider";
import { AppData } from "types";
import {
  AccountPage,
  AnalysisPage,
  FixturesAndResultsPage,
  GameweekLivePage,
  LoginPage,
  MyTeamPage,
  RegisterPage,
  ResetPage,
} from "pages";

export const AppDataContext = React.createContext<AppData | null>(null);

export default function AppContent(): JSX.Element {
  // Fetching game data which will be made available throughout the app via context provider
  const {
    data: gameData,
    isError: gameDataIsError,
    error: gameDataError,
    isLoading: gameDataIsLoading,
  } = useQuery("game-data", getGameData);

  // Fetching fixture data which will be made available throughout the app via context provider
  const {
    data: fixtureData,
    isError: fixtureDataIsError,
    error: fixtureDataError,
    isLoading: fixtureDataIsLoading,
  } = useQuery("all-fixtures", getAllFixtures);

  const isLoading = gameDataIsLoading || fixtureDataIsLoading;
  const isError = gameDataIsError || fixtureDataIsError;
  const appData = gameData && fixtureData ? { gameData, fixtureData } : null;

  if (isLoading) {
    // Display loading message if data is still being fetched
    return (
      <Startup>
        <LoadingMessage message="Loading.." />
      </Startup>
    );
  } else if (isError) {
    // Display error message if data fetch failed
    const error = gameDataError || fixtureDataError;
    const errorMessage = error instanceof Error ? `: ${error.message}` : ".";
    return (
      <Startup>
        <ErrorMessage message={`An error has occured${errorMessage}`} />
      </Startup>
    );
  } else {
    // Otherwise, render the app
    return (
      <AppDataContext.Provider value={appData}>
        <Router>
          <Routes>
            <Route path="*" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset" element={<ResetPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/account" element={<PrivateRoute component={<AccountPage />} />} />
            <Route
              path="/gameweek-live"
              element={<PrivateRoute component={<GameweekLivePage />} />}
            />
            <Route path="/my-team" element={<PrivateRoute component={<MyTeamPage />} />} />
            <Route
              path="/fixtures-and-results"
              element={<PrivateRoute component={<FixturesAndResultsPage />} />}
            />
            <Route path="/analysis" element={<PrivateRoute component={<AnalysisPage />} />} />
          </Routes>
        </Router>
      </AppDataContext.Provider>
    );
  }
}