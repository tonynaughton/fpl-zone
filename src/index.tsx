import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppContent from "app_content";

import "./global.css";

const breakpoints = {
  values: {
    xs: 400,
    sm: 576,
    md: 768,
    lg: 1024,
    xl: 1440
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
          fontSize: "1.5vh",
          color: "white",
          backgroundColor: "black"
        },
        arrow: {
          color: "black"
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "0 0.5vw"
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
const getTypographyProps = (fontSize: number, fontWeight?: number) => {
  return {
    fontFamily: ["Grandstander"].join(","),
    fontWeight,
    fontSize: `${fontSize}rem`,
    [theme.breakpoints.up("xs")]: {
      fontSize: `${fontSize * 0.7}rem`
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: `${fontSize * 0.8}rem`
    },
    [theme.breakpoints.up("md")]: {
      fontSize: `${fontSize * 0.9}rem`
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: `${fontSize}rem`
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: `${fontSize * 1.1}rem`
    }
  };
};

theme.typography.h1 = getTypographyProps(2, 600);
theme.typography.h2 = getTypographyProps(1.4, 600);
theme.typography.h3 = getTypographyProps(1.2, 600);
theme.typography.h4 = getTypographyProps(1, 600);
theme.typography.h5 = getTypographyProps(0.8, 600);
theme.typography.body1 = getTypographyProps(0.9);

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
