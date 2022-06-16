import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { getPlayerImageUrl } from "helpers";
import { mockAppData, mockPlayers } from "test/test_data";

import "@testing-library/jest-dom/extend-expect";

import { MAX_PLAYER_COUNT, PlayerImageTableRow } from ".";

describe("Player image table row tests", () => {
  let mockSelectedPlayers = mockPlayers.slice(0, 3);

  const mockOnAddPlayerClick = jest.fn();
  const mockOnRemovePlayerClick = jest.fn();

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <PlayerImageTableRow
          onAddPlayerClick={mockOnAddPlayerClick}
          onRemovePlayerClick={mockOnRemovePlayerClick}
          selectedPlayers={mockSelectedPlayers}
        />
      </AppDataContext.Provider>
    );
  };


  describe("Player image container", () => {
    describe("if no player prop is present", () => {
      it("has expected style properties", () => {
        render(createComponent());

        const container = screen.getByTestId(`player-image-container-placeholder`);
        const placeHolderImageUrl = `${process.env.PUBLIC_URL}/assets/images/player-placeholder.png`;

        expect(container).toHaveStyle(`background-image: url(${placeHolderImageUrl})`);
        expect(container).toHaveStyle(`cursor: pointer`);
        expect(container).toHaveStyle(`borderRadius: 50%`);
      });

      it("has onClick attribute if no player prop was passed", () => {
        render(createComponent());

        const container = screen.getByTestId("player-image-container-placeholder");
        fireEvent.click(container);

        expect(mockOnAddPlayerClick).toHaveBeenCalledTimes(1);
      });

      it("add button present", () => {
        render(createComponent());
        const container = within(screen.getByTestId("player-image-container-placeholder"));

        expect(container.getByTestId("add-button")).toBeInTheDocument();
      });

      it("remove button not present", () => {
        render(createComponent());
        const container = within(screen.getByTestId("player-image-container-placeholder"));

        expect(container.queryByTestId("remove-button")).toBeNull();
      });
    });

    describe("if a player prop is present", () => {
      it("has expected style properties", () => {
        render(createComponent());

        mockSelectedPlayers.forEach((player) => {
          const container = screen.getByTestId(`player-image-container-${player.id}`);
          const imageUrl = getPlayerImageUrl(player);

          expect(container).toHaveStyle(`background-image: url(${imageUrl})`);
          expect(container).toHaveStyle(`cursor: auto`);
          expect(container).toHaveStyle(`borderRadius: auto`);
        });
      });

      it("has no onClick attribute if a player prop was passed", () => {
        render(createComponent());

        mockSelectedPlayers.forEach((player) => {
          const container = screen.getByTestId(`player-image-container-${player.id}`);
          fireEvent.click(container);

          expect(mockOnAddPlayerClick).toHaveBeenCalledTimes(0);
        });
      });

      it("add button not present", () => {
        render(createComponent());

        mockSelectedPlayers.forEach((player) => {
          const container = within(screen.getByTestId(`player-image-container-${player.id}`));

          expect(container.queryByTestId("add-button")).toBeNull();
        });
      });

      it("remove button present", () => {
        render(createComponent());

        mockSelectedPlayers.forEach((player, index) => {
          const container = within(screen.getByTestId(`player-image-container-${player.id}`));
          const removeButton = container.getByTestId("remove-button");

          expect(removeButton).toBeInTheDocument();

          fireEvent.click(removeButton);

          expect(mockOnRemovePlayerClick).toHaveBeenCalledTimes(index + 1);
        });
      });
    });
  });

  describe("Placeholder image table cell", () => {
    it(`displayed when less than ${MAX_PLAYER_COUNT} players are selected`, () => {
      render(createComponent());

      expect(screen.getByTestId("player-image-container-placeholder")).toBeInTheDocument();
    });

    it(`not displayed when ${MAX_PLAYER_COUNT} players are selected`, () => {
      mockSelectedPlayers = mockPlayers.slice(0, MAX_PLAYER_COUNT);

      render(createComponent());

      expect(screen.queryByTestId("player-image-container-placeholder")).toBeNull();
    });
  });
});
