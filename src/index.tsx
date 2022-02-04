import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Login from "components/authentication/login";
import Register from "components/authentication/register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import GameweekLive from "components/gameweek_live/gameweek_live";
import Reset from "components/authentication/reset";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import "./global.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "config/firebase";
import PrivateRoute from "components/authentication/private_route";

library.add(fas, faFutbol);

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

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/gameweek-live" element={<PrivateRoute component={<GameweekLive />} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
