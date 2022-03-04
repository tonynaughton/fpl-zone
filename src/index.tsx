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

const customTheme = createTheme({
  typography: {
    fontFamily: ["Grandstander", "Roboto Condensed"].join(","),
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
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
