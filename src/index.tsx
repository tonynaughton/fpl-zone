import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "pages/register_page";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import ResetPage from "pages/reset_page";
import PrivateRoute from "private_route";
import Logout from "components/authentication/logout";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import AccountPage from "pages/account_page";
import LoginPage from "pages/login_page";
import GameweekLivePage from "pages/gameweek_live_page";
import MyTeamPage from "pages/my_team_page";
import FixturesAndResultsPage from "pages/fixtures_and_results_page";
import AnalysisPage from "pages/analysis_page";
import { getAllFixtures, getGameData } from "api/fpl_api_provider";
import "./global.css";
import { Fixture, GameData } from "types";
import Loading from "components/layout/loading";
import { AppData } from "types/app_data";

const customTheme = createTheme({
  typography: {
    fontFamily: ["Grandstander"].join(","),
    fontWeightRegular: 500,
    h1: {
      fontWeight: 600,
      fontSize: 42,
    },
    h2: {
      fontWeight: 600,
      fontSize: 32,
    },
    h3: {
      fontWeight: 600,
      fontSize: "2.4vh",
    },
    h4: {
      fontWeight: 600,
      fontSize: 25,
    },
    h5: {
      fontWeight: 600,
      fontSize: 18,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: "1.5vh",
    },
  },
  palette: {
    primary: {
      main: "#16B7EA",
      contrastText: "#F9F9F9",
    },
    secondary: {
      main: "#7EFF83",
    },
    info: {
      main: "#F9F9F9",
    },
    background: {
      default: "#F9F9F9",
    },
    text: {
      primary: "#000000",
      secondary: "#16B7EA",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        placement: "top",
      },
      styleOverrides: {
        tooltip: {
          fontSize: "1.5vh",
          color: "white",
          backgroundColor: "black",
        },
        arrow: {
          color: "black",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "0 0.5vw",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#F9F9F9",
        },
        input: {
          color: "black",
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const AppDataContext = React.createContext<AppData | null>(null);

const App = (): JSX.Element => {
  const [appData, setAppData] = useState<AppData | null>(null);

  useEffect(() => {
    async function fetchGameData(): Promise<void> {
      await getGameData().then(async (gameData) => {
        await getAllFixtures().then((fixtureData) => {
          setAppData({ gameData, fixtureData });
        });
      });
    }

    fetchGameData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {!appData ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Loading message="Loading.." />
          </Box>
        ) : (
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
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
