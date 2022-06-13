import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData, mockPlayers } from "test/test_data";
import { Player } from "types";

import "@testing-library/jest-dom/extend-expect";

import { PlayerNameTableRow } from ".";

describe("Player name table row tests", () => {
  let players: Player[];

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <PlayerNameTableRow players={players} />
      </AppDataContext.Provider>
    );
  };

  it("Snapshot test", () => {
    players = mockPlayers.slice(0, 4);

    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  it("Player's name displayed correctly", () => {
    render(createComponent());

    players.forEach((player) => {
      const playerNameContainer = screen.getByTestId(`player-name-row-${player.id}`);
      expect(playerNameContainer).toHaveTextContent(`${player.first_name} ${player.second_name}`);
    });
  });

  describe("Empty table cell", () => {
    it("displayed when less than 5 five players are selected", () => {
      players = mockPlayers.slice(0, 2);

      render(createComponent());

      expect(screen.getByTestId("empty-table-cell")).toBeInTheDocument();
    });

    it("not displayed when 5 five players are selected", () => {
      players = mockPlayers.slice(0, 5);

      render(createComponent());

      expect(screen.queryByTestId("empty-table-cell")).toBeNull();
    });
  });
});
