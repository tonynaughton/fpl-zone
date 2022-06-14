import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData, mockPlayers } from "test/test_data";
import { Player } from "types";

import "@testing-library/jest-dom/extend-expect";

import { MAX_PLAYER_COUNT, PlayerNameTableRow } from ".";

describe("Player name table row tests", () => {
  let mockSelectedPlayers: Player[];

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <PlayerNameTableRow selectedPlayers={mockSelectedPlayers} />
      </AppDataContext.Provider>
    );
  };

  it("Snapshot test", () => {
    mockSelectedPlayers = mockPlayers.slice(0, 2);

    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  it("Player's name displayed correctly", () => {
    render(createComponent());

    mockSelectedPlayers.forEach((player) => {
      const playerNameContainer = screen.getByTestId(`player-name-row-${player.id}`);
      expect(playerNameContainer).toHaveTextContent(`${player.first_name} ${player.second_name}`);
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
