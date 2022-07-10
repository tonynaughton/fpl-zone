import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { AppDataContext } from "app_content";

import { mockAppData } from "./test_data";

interface MockProviderProps {
  children: JSX.Element;
}

export const mockTheme = {
  breakpoints: {},
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
  }
};

export const MockProviders = ({ children }: MockProviderProps): JSX.Element => {
  const theme = createTheme(mockTheme);

  return (
    <ThemeProvider theme={theme}>
      <AppDataContext.Provider value={mockAppData}>
        {children}
      </AppDataContext.Provider>
    </ThemeProvider>
  );
};
