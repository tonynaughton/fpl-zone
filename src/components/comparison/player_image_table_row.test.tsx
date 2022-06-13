import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { getPlayerImageUrl } from "helpers";
import { mockAppData, mockPlayers } from "test/test_data";

import "@testing-library/jest-dom/extend-expect";

import { PlayerImageTableRow } from ".";

describe("Player image table row tests", () => {
  let players = mockPlayers.slice(0, 3);

  const mockOnAddPlayerClick = jest.fn();

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <PlayerImageTableRow
          onAddPlayerClick={mockOnAddPlayerClick}
          onRemovePlayerClick={jest.fn()}
          players={players}
        />
      </AppDataContext.Provider>
    );
  };

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

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
    });

    describe("if a player prop is present", () => {
      it("has expected style properties", () => {
        render(createComponent());

        players.forEach((player) => {
          const container = screen.getByTestId(`player-image-container-${player.id}`);
          const imageUrl = getPlayerImageUrl(player);

          expect(container).toHaveStyle(`background-image: url(${imageUrl})`);
          expect(container).toHaveStyle(`cursor: auto`);
          expect(container).toHaveStyle(`borderRadius: auto`);
        });
      });

      it("has no onClick attribute if a player prop was passed", () => {
        render(createComponent());

        players.forEach((player) => {
          const container = screen.getByTestId(`player-image-container-${player.id}`);
          fireEvent.click(container);

          expect(mockOnAddPlayerClick).toHaveBeenCalledTimes(0);
        });
      });
    });
  });

  describe("Placeholder image table cell", () => {
    it("displayed when less than 5 five players are selected", () => {
      render(createComponent());

      expect(screen.getByTestId("player-image-container-placeholder")).toBeInTheDocument();
    });

    it("not displayed when 5 five players are selected", () => {
      players = mockPlayers.slice(0, 5);

      render(createComponent());

      expect(screen.queryByTestId("player-image-container-placeholder")).toBeNull();
    });
  });
});
