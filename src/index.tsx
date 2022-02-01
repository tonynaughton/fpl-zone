import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "components/authentication/login";
import Register from "components/authentication/register";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import GameweekLive from "components/gameweek_live/gameweek_live";
import Reset from "components/authentication/reset";
import "./global.css";

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
      default: "#16B7EA",
    },
    text: {
      primary: "#F9F9F9",
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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/gameweek-live" element={<GameweekLive />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
