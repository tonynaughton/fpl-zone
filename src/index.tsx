import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "pages/register_page";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import ResetPage from "pages/reset_page";
import "./global.css";
import PrivateRoute from "private_route";
import Logout from "components/authentication/logout";
import { QueryClient, QueryClientProvider } from "react-query";
import AccountPage from "pages/account_page";
import LoginPage from "pages/login_page";
import GameweekLivePage from "pages/gameweek_live_page";
import MyTeamPage from "pages/my_team_page";
import FixturesAndResultsPage from "pages/fixtures_and_results_page";
import AnalysisPage from "pages/analysis_page";

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
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
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
      </ThemeProvider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
