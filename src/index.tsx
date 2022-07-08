import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
import { createTheme,ThemeProvider } from "@mui/material/styles";
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
    xs: 640,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536
  }
};

const theme = createTheme({
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getTypographyProps = (fontSize: number, fontWeight = 500) => {
  return {
    fontFamily: ["Grandstander"].join(","),
    fontWeight,
    fontSize: `${fontSize}rem`,
    [theme.breakpoints.up("xs")]: {
      fontSize: `${fontSize * 0.6}rem`
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: `${fontSize * 0.8}rem`
    },
    [theme.breakpoints.up("md")]: {
      fontSize: `${fontSize}rem`
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: `${fontSize * 1.2}rem`
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: `${fontSize * 1.4}rem`
    }
  };
};

theme.typography.h1 = getTypographyProps(1.6, 600);
theme.typography.h2 = getTypographyProps(1.4, 600);
theme.typography.h3 = getTypographyProps(1.2, 600);
theme.typography.h4 = getTypographyProps(1.0, 600);
theme.typography.h5 = getTypographyProps(0.8, 600);
theme.typography.body1 = getTypographyProps(0.8);
theme.typography.body2 = getTypographyProps(0.6);

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
