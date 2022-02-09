import React from "react";
import { render, screen } from "@testing-library/react";
import NavDrawer from "../components/nav_drawer/nav_drawer";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "react-query";

describe("Nav Drawer Tests", () => {
  const mockQueryClient = new QueryClient();

  const templateRenderFunction = (label: string): JSX.Element => {
    return (
      <QueryClientProvider client={mockQueryClient}>
        <Router>
          <NavDrawer activeLabel={label} />
        </Router>
      </QueryClientProvider>
    );
  };

  it("Renders as expected", () => {
    const { asFragment } = render(templateRenderFunction("gameweek-live"));
    expect(asFragment()).toMatchSnapshot();
  });

  describe("Active label has expected styling", () => {
    it("When 'gameweek live' is active", () => {
      render(templateRenderFunction("gameweek live"));
      expect(screen.getByText("GAMEWEEK LIVE")).toHaveStyle("color: black");
      expect(screen.getByText("MY TEAM")).toHaveStyle("color: white");
    });

    it("When 'my team' is active", () => {
      render(templateRenderFunction("my team"));
      expect(screen.getByText("GAMEWEEK LIVE")).toHaveStyle("color: white");
      expect(screen.getByText("MY TEAM")).toHaveStyle("color: black");
    });
  });
});
