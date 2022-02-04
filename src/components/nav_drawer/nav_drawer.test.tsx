import React from "react";
import { render, screen } from "@testing-library/react";
import NavDrawer from "./nav_drawer";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Nav Drawer Tests", () => {
  it("Renders as expected", () => {
    const { asFragment } = render(
      <Router>
        <NavDrawer activeLabel="gameweek live" />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe("Active label has expected styling", () => {
    it("When 'gameweek live' is active", () => {
      render(
        <Router>
          <NavDrawer activeLabel="gameweek live" />
        </Router>
      );
      expect(screen.getByText("GAMEWEEK LIVE")).toHaveStyle("color: black");
      expect(screen.getByText("MY TEAM")).toHaveStyle("color: white");
    });

    it("When 'my team' is active", () => {
      render(
        <Router>
          <NavDrawer activeLabel="my team" />
        </Router>
      );
      expect(screen.getByText("GAMEWEEK LIVE")).toHaveStyle("color: white");
      expect(screen.getByText("MY TEAM")).toHaveStyle("color: black");
    });
  });
});
