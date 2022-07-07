import React from "react";
import { GridRowId } from "@mui/x-data-grid";
import { render, screen, within } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { getPositionById, getTeamById, getTeamCrestImageUrl } from "helpers";
import { mockAppData, mockPlayers, mockPositions, mockTeams } from "test/test_data";

import "@testing-library/jest-dom/extend-expect";

import { MAX_PLAYER_COUNT } from "../player_comparison";

import { AddPlayersTable } from "./add_players_table";

describe("Add players table tests", () => {
  const mockAllPlayers = mockPlayers;
  let mockSelectedPlayerIds: GridRowId[];
  const mockSearchInput = "";
  const mocksetTempSelectedPlayers = jest.fn();

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <AddPlayersTable
          searchInput={mockSearchInput}
          selectionModel={mockSelectedPlayerIds}
          setSelectionModel={mocksetTempSelectedPlayers}
        />
      </AppDataContext.Provider>
    );
  };

  describe("Player selected count", () => {
    it(`When player count has not reached ${MAX_PLAYER_COUNT}`, () => {
      mockSelectedPlayerIds = mockPlayers.slice(0, 2).map(p => p.id);
      render(createComponent());

      const text = screen.getByTestId("selected-player-count");
      expect(text).toHaveTextContent(`${mockSelectedPlayerIds.length}/${MAX_PLAYER_COUNT}`);
      expect(text).toHaveStyle("color: black");
    });

    it(`When player count has reached ${MAX_PLAYER_COUNT}`, () => {
      mockSelectedPlayerIds = mockPlayers.slice(0, 2).map(p => p.id);
      render(createComponent());

      const text = screen.getByTestId("selected-player-count");
      expect(text).toHaveTextContent(`${mockSelectedPlayerIds.length}/${MAX_PLAYER_COUNT}`);
      expect(text).toHaveStyle("color: red");
    });
  });

  describe("Player data", () => {
    it("Player name", () => {
      mockSelectedPlayerIds = mockPlayers.slice(0, 2).map(p => p.id);
      render(createComponent());

      mockAllPlayers.forEach((player) => {
        const playerNameCell = screen.getByTestId(`player-name-table-cell-${player.id}`);

        expect(playerNameCell).toHaveTextContent(`${player.first_name} ${player.second_name}`);
      });
    });

    it("Player team name and image", () => {
      mockSelectedPlayerIds = mockPlayers.slice(0, 2).map(p => p.id);
      render(createComponent());

      mockAllPlayers.forEach((player) => {
        const playerTeamCrestImg = screen.getByTestId(`player-team-crest-${player.id}`);
        const team = getTeamById(player.team, mockTeams);
        const imgUrl = getTeamCrestImageUrl(player.team_code);

        expect(playerTeamCrestImg).toHaveAttribute("src", imgUrl);

        const teamNameText = screen.getByTestId(`player-team-name-${player.id}`);
        expect(teamNameText).toHaveTextContent(team.name);
      });
    });

    it("Player position", () => {
      mockSelectedPlayerIds = mockPlayers.slice(0, 2).map(p => p.id);
      render(createComponent());

      mockAllPlayers.forEach((player) => {
        const playerPosition = getPositionById(player.element_type, mockPositions);
        const playerPositionText = screen.getByTestId(`player-position-text-${player.id}`);

        expect(playerPositionText).toHaveTextContent(playerPosition.singular_name_short);
      });
    });
  });

  describe("Checkboxes", () => {
    const testCheckboxDisabledStatus = (ids: GridRowId[], expectedVal: boolean): void => {
      ids.forEach((id) => {
        const checkboxCell = within(screen.getByTestId(`checkbox-table-cell-${id}`));
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
        mockSelectedPlayerIds = mockPlayers.slice(0, 2).map(p => p.id);
        render(createComponent());

        testCheckboxDisabledStatus(mockAllPlayers.map(p => p.id), false);
      });
    });

    describe(`if ${MAX_PLAYER_COUNT} players have been selected`, () => {
      it("should not be disabled for players already selected", () => {
        mockSelectedPlayerIds = mockPlayers.slice(0, MAX_PLAYER_COUNT).map(p => p.id);
        render(createComponent());

        testCheckboxDisabledStatus(mockSelectedPlayerIds, false);
      });

      it("should be disabled for unselected players", () => {
        mockSelectedPlayerIds = mockPlayers.slice(0, MAX_PLAYER_COUNT).map(p => p.id);
        render(createComponent());

        const allPlayersWithoutSelected = mockPlayers.filter(player => {
          return !mockSelectedPlayerIds.includes(player.id);
        });

        testCheckboxDisabledStatus(allPlayersWithoutSelected.map(p => p.id), true);
      });
    });
  });
});
