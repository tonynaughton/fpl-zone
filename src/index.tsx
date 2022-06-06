import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import AppContent from "app_content";

import "./global.css";

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
    h6: {
      fontWeight: 600,
      fontSize: "1.8vh",
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: "1.6vh",
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
    MuiTypography: {
      defaultProps: {
        variant: "body2",
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
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
