import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppContent from "app_content";

import "./global.css";

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
      main: "#16B7EA",
      contrastText: "#F9F9F9"
    },
    secondary: {
      main: "#7EFF83"
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
      main: "#c30000"
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#F9F9F9"
        },
        input: {
          color: "black"
        }
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
      fontSize: `${fontSize * 0.5}rem`
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: `${fontSize * 0.7}rem`
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

theme.typography.h1 = getTypographyProps(1.5, 600);
theme.typography.h2 = getTypographyProps(1.3, 600);
theme.typography.h3 = getTypographyProps(1.1, 600);
theme.typography.h4 = getTypographyProps(0.9, 600);
theme.typography.h5 = getTypographyProps(0.7, 600);
theme.typography.body1 = getTypographyProps(0.7);
theme.typography.body2 = getTypographyProps(0.5);

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
