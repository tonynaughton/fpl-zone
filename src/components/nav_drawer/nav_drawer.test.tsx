import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { MockProviders, mockTheme } from "test/mock_providers";

import "@testing-library/jest-dom";

import NavDrawer from "./nav_drawer";

describe("Nav Drawer Tests", () => {
  let mockActiveId: string;

  const mockQueryClient = new QueryClient();

  const createComponent = (): JSX.Element => {
    return (
      <QueryClientProvider client={mockQueryClient}>
        <Router>
          <MockProviders>
            <NavDrawer activeId={mockActiveId} />
          </MockProviders>
        </Router>
      </QueryClientProvider>
    );
  };

  describe("Active label has expected styling", () => {
    it("When 'gameweek live' is active", async () => {
      mockActiveId = "gw-live";

      render(createComponent());

      await screen.findByTestId("nav-drawer").then(() => {
        expect(screen.getByTestId("menu-item-text-gw-live")).toHaveStyle("color: black");
        expect(screen.getByTestId("menu-item-text-my-fpl")).toHaveStyle(`color: ${mockTheme.palette.info.main}`);
      });
    });

    it("When 'my team' is active", async () => {
      mockActiveId = "my-fpl";

      render(createComponent());

      await screen.findByTestId("nav-drawer").then(() => {
        expect(screen.getByTestId("menu-item-text-gw-live")).toHaveStyle(`color: ${mockTheme.palette.info.main}`);
        expect(screen.getByTestId("menu-item-text-my-fpl")).toHaveStyle("color: black");
      });
    });
  });
});
