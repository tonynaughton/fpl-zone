import React from "react";
import { Logout } from "@mui/icons-material";
import { Box } from "@mui/material";
import { LoadingMessage, ErrorMessage } from "components/layout";
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
  const {
    data: gameData,
    isError: gameDataIsError,
    error: gameDataError,
    isLoading: gameDataIsLoading,
  } = useQuery("game-data", getGameData);

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
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <LoadingMessage message="Loading.." />
      </Box>
    );
  } else if (isError) {
    const error = gameDataError || fixtureDataError;
    const message = error instanceof Error ? error.message : "";
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <ErrorMessage message={`An error has occured: ${message}`} />
      </Box>
    );
  } else {
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
            <Route path="/gameweek-live" element={<GameweekLivePage />} />
            <Route path="/my-team" element={<MyTeamPage />} />
            <Route path="/fixtures-and-results" element={<FixturesAndResultsPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
          </Routes>
        </Router>
      </AppDataContext.Provider>
    );
  }
}
