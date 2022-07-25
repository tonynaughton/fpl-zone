import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import { getAllFixtures, getGameData } from "api/fpl_api_provider";
import { auth } from "config";
import { User } from "firebase/auth";
import { isError } from "lodash";
import {
  AnalysisPage,
  FixturesAndResultsPage,
  GameweekLivePage,
  MyFPLPage
} from "pages";
import { AppData } from "types";

import { Notifier, Startup } from "components/layout";

interface AuthContextType {
  fplId: number | undefined;
  setFplId: (value?: number | undefined) => void;
  user: User | null | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const AuthContext = React.createContext<AuthContextType>({ fplId: undefined, setFplId: () => {}, user: undefined });
export const AppDataContext = React.createContext<AppData | null>(null);

export default function AppContent(): JSX.Element {
  const [user] = useAuthState(auth);
  const [fplId, setFplId] = useState<number | undefined>();
  const authContextValue = { fplId, setFplId, user };

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

  const isLoading = gameDataIsLoading || fixtureDataIsLoading;
  const error = gameDataIsError || fixtureDataIsError;
  const appDataContextValue: AppData | null = gameData && fixtureData
    ? {
      gameweeks: gameData.events,
      gameSettings: gameData.game_settings,
      phases: gameData.phases,
      teams: gameData.teams,
      playerCount: gameData.total_players,
      players: gameData.elements,
      playerStats: gameData.element_stats,
      positions: gameData.element_types,
      fixtures: fixtureData
    }
    : null;

  if (isLoading) {
    return (
      <Startup>
        <Notifier />
      </Startup>
    );
  } else if (error) {
    // Display error message if data fetch failed
    const error = gameDataError || fixtureDataError;
    const errorMessage = isError(error) ? `: ${error.message}` : ".";

    return (
      <Startup>
        <Notifier message={`An error has occured: ${errorMessage}`} type='error' />
      </Startup>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <AppDataContext.Provider value={appDataContextValue}>
        <Router>
          <Routes>
            <Route element={<GameweekLivePage />} path='*' />
            <Route element={<GameweekLivePage />} path='/' />
            <Route element={<GameweekLivePage />} path='gameweek-live' />
            <Route element={<MyFPLPage />} path='/my-fpl' />
            <Route element={<FixturesAndResultsPage />} path='/fixtures-and-results' />
            <Route element={<AnalysisPage />} path='/analysis' />
          </Routes>
        </Router>
      </AppDataContext.Provider>
    </AuthContext.Provider>
  );

}
