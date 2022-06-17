import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { useTeamById } from "hooks/use_team_by_id";
import { mockAppData, mockPlayers } from "test/test_data";

import "@testing-library/jest-dom/extend-expect";

import { MAX_PLAYER_COUNT, TeamNameTableRow } from ".";

describe("Team name table row tests", () => {
  let mockSelectedPlayers = mockPlayers.splice(0, 3);

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <TeamNameTableRow
          selectedPlayers={mockSelectedPlayers}
        />
      </AppDataContext.Provider>
    );
  };

  it("Player's team name displayed correctly", () => {
    render(createComponent());

    mockSelectedPlayers.forEach((player) => {
      const row = screen.getByTestId(`team-name-row-${player.id}`);
      const team = useTeamById(player.team);
      expect(row).toHaveTextContent(team.name);
    });
  });

  describe("Empty table cell", () => {
    it(`displayed when less than ${MAX_PLAYER_COUNT} players are selected`, () => {
      render(createComponent());

      expect(screen.getByTestId("empty-table-cell")).toBeInTheDocument();
    });

    it(`not displayed when ${MAX_PLAYER_COUNT} players are selected`, () => {
      mockSelectedPlayers = mockPlayers.slice(0, MAX_PLAYER_COUNT);

      render(createComponent());

      expect(screen.queryByTestId("empty-table-cell")).toBeNull();
    });
  });
});
