import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData, mockPlayers } from "test/test_data";
import { Player, TeamPicks } from "types";

import "@testing-library/jest-dom/extend-expect";

import { LineupRow } from "./lineup_row";

describe("Lineup row tests", () => {
  let mockLineupRowTeamPicks: TeamPicks;
  let mockLineupRowPlayers: Player[];
  const mockHandlePlayerPerformanceClick = jest.fn();

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <LineupRow
          handlePlayerPerformanceClick={mockHandlePlayerPerformanceClick}
          players={mockLineupRowPlayers}
          teamPicks={mockLineupRowTeamPicks}
        />
      </AppDataContext.Provider>
    );
  };

  it("Player in row displayed correctly", () => {
    mockLineupRowPlayers = mockPlayers.slice(0, 3);

    render(createComponent());

    mockLineupRowPlayers.forEach((player) => {
      const playerContainer = screen.getByTestId(`player-container-${player.id}`);

      expect(playerContainer).toHaveTextContent(player.web_name);
      expect(playerContainer).toHaveTextContent(player.event_points.toString());
    });
  });
});
