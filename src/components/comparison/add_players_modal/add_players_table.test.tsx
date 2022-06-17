import React from "react";
import { render, screen, within } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { getPositionById, getTeamById } from "helpers";
import { mockAppData, mockPlayers, mockPositions, mockTeams } from "test/test_data";
import { Player } from "types";

import "@testing-library/jest-dom/extend-expect";

import { MAX_PLAYER_COUNT } from "../player_comparison";
import { AddPlayersTable } from "..";

describe("Add players table tests", () => {
  const mockAllPlayers = mockPlayers;
  let mockTempSelectedPlayers: Player[];

  const mockOnPlayerToggle = jest.fn();

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <AddPlayersTable
          displayedPlayers={mockAllPlayers}
          onPlayerToggle={mockOnPlayerToggle}
          tempSelectedPlayers={mockTempSelectedPlayers}
        />
      </AppDataContext.Provider>
    );
  };

  describe("Player selected count", () => {
    it(`When player count has not reached ${MAX_PLAYER_COUNT}`, () => {
      mockTempSelectedPlayers = mockPlayers.slice(0, 2);
      render(createComponent());

      const text = screen.getByTestId("selected-player-count");
      expect(text).toHaveTextContent(`${mockTempSelectedPlayers.length}/${MAX_PLAYER_COUNT}`);
      expect(text).toHaveStyle("color: black");
    });

    it(`When player count has reached ${MAX_PLAYER_COUNT}`, () => {
      mockTempSelectedPlayers = mockPlayers.slice(0, 5);
      render(createComponent());

      const text = screen.getByTestId("selected-player-count");
      expect(text).toHaveTextContent(`${mockTempSelectedPlayers.length}/${MAX_PLAYER_COUNT}`);
      expect(text).toHaveStyle("color: red");
    });
  });

  describe("Player data", () => {
    it("Player name", () => {
      mockTempSelectedPlayers = mockPlayers.slice(0, 2);
      render(createComponent());

      mockAllPlayers.forEach((player) => {
        const playerNameCell = screen.getByTestId(`player-name-table-cell-${player.id}`);

        expect(playerNameCell).toHaveTextContent(`${player.first_name} ${player.second_name}`);
      });
    });

    it("Player team name and image", () => {
      mockTempSelectedPlayers = mockPlayers.slice(0, 2);
      render(createComponent());

      mockAllPlayers.forEach((player) => {
        const playerTeamCrestImg = screen.getByTestId(`player-team-crest-${player.id}`);
        const team = getTeamById(player.team, mockTeams);
        const imgUrl = `${process.env.PUBLIC_URL}/assets/images/crests/${team.code}.png`;

        expect(playerTeamCrestImg).toHaveAttribute("src", imgUrl);

        const teamNameText = screen.getByTestId(`player-team-name-${player.id}`);
        expect(teamNameText).toHaveTextContent(team.name);
      });
    });

    it("Player position", () => {
      mockTempSelectedPlayers = mockPlayers.slice(0, 2);
      render(createComponent());

      mockAllPlayers.forEach((player) => {
        const playerPosition = getPositionById(player.element_type, mockPositions);
        const playerPositionText = screen.getByTestId(`player-position-text-${player.id}`);

        expect(playerPositionText).toHaveTextContent(playerPosition.singular_name_short);
      });
    });
  });

  describe("Checkboxes", () => {
    const testCheckboxDisabledStatus = (players: Player[], expectedVal: boolean): void => {
      players.forEach((player) => {
        const checkboxCell = within(screen.getByTestId(`checkbox-table-cell-${player.id}`));
        const checkbox = within(checkboxCell.getByTestId("controlled-checkbox")).getByRole("checkbox");

        if (expectedVal) {
          expect(checkbox).toBeDisabled();
        } else {
          expect(checkbox).not.toBeDisabled();
        };
      });
    };

    describe(`if less than ${MAX_PLAYER_COUNT} players have been selected`, () => {
      it("should not be disabled for all players", () => {
        mockTempSelectedPlayers = mockPlayers.slice(0, 2);
        render(createComponent());

        testCheckboxDisabledStatus(mockAllPlayers, false);
      });
    });

    describe(`if ${MAX_PLAYER_COUNT} players have been selected`, () => {
      it("should not be disabled for players already selected", () => {
        mockTempSelectedPlayers = mockPlayers.slice(0, MAX_PLAYER_COUNT);
        render(createComponent());

        testCheckboxDisabledStatus(mockTempSelectedPlayers, false);
      });

      it("should be disabled for unselected players", () => {
        mockTempSelectedPlayers = mockPlayers.slice(0, MAX_PLAYER_COUNT);
        render(createComponent());

        const allPlayersWithoutSelected = mockPlayers.filter(player => {
          return !mockTempSelectedPlayers.includes(player);
        });

        testCheckboxDisabledStatus(allPlayersWithoutSelected, true);
      });
    });
  });
});
