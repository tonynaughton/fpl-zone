import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData } from "test";

import { AuthModalView } from "components/layout";

import "@testing-library/jest-dom";

import NavDrawer from "./nav_drawer";

describe("Nav Drawer Tests", () => {
  let mockLabel: string;
  let mockOpenAuthModal: (value: AuthModalView) => void;

  const mockQueryClient = new QueryClient();

  const createComponent = (): JSX.Element => {
    return (
      <QueryClientProvider client={mockQueryClient}>
        <Router>
          <AppDataContext.Provider value={mockAppData}>
            <NavDrawer active={mockLabel} openAuthModal={mockOpenAuthModal} />
          </AppDataContext.Provider>
        </Router>
      </QueryClientProvider>
    );
  };

  describe("Active label has expected styling", () => {
    it("When 'gameweek live' is active", () => {
      mockLabel = "gameweek live";

      render(createComponent());

      expect(screen.getByText("GAMEWEEK LIVE")).toHaveStyle("color: black");
      expect(screen.getByText("MY FPL")).toHaveStyle("color: white");
    });

    it("When 'my team' is active", () => {
      mockLabel = "my fpl";

      render(createComponent());

      expect(screen.getByText("GAMEWEEK LIVE")).toHaveStyle("color: white");
      expect(screen.getByText("MY FPL")).toHaveStyle("color: black");
    });
  });
});
