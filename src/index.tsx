import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
import { createTheme, responsiveFontSizes,ThemeProvider } from "@mui/material/styles";
import AppContent from "app_content";

import "./global.css";

declare module "@mui/material/styles" {
  export interface PaletteOptions {
    fdr: Record<string, string>;
    highlight: Record<string, string>;
  }

  export interface Palette {
    fdr: Record<string, string>;
    highlight: Record<string, string>;
  }
}

const breakpoints = {
  values: {
    xs: 480,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536
  }
};

let theme = createTheme({
  breakpoints,
  palette: {
    primary: {
      main: "#167BFF",
      contrastText: "#F9F9F9"
    },
    secondary: {
      main: "#72F15F",
      contrastText: "#000000"
    },
    info: {
      main: "#F9F9F9"
    },
    background: {
      default: "#F9F9F9"
    },
    text: {
      primary: "#000000",
      secondary: "#16B7EA"
    },
    warning: {
      main: "#DF2935",
      contrastText: "#F9F9F9"
    },
    error: {
      main: "#FF686B"
    },
    success: {
      main: "#64F58D",
      contrastText: "#000000"
    },
    highlight: {
      main: "#E0E0E0"
    },
    fdr: {
      1: "#09BA59",
      2: "#93E02D",
      3: "#F5CF38",
      4: "#DE7628",
      5: "#FF193C"
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: "Grandstander"
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        placement: "top"
      },
      styleOverrides: {
        tooltip: {
          fontSize: "0.9rem",
          color: "white",
          backgroundColor: "black",
          fontFamily: ["Grandstander"].join(",")
        },
        arrow: {
          color: "black"
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "black",
          cursor: "pointer",
          "&:hover": {
            color: "#167BFF"
          }
        }
      },
      defaultProps: {
        underline: "none"
      }
    }
  }
});

theme = responsiveFontSizes(theme);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
