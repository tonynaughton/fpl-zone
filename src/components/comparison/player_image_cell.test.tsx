import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { getPlayerImageUrl } from "helpers";
import { MockProviders } from "test/mock_providers";
import { mockPlayers } from "test/test_data";
import { Player } from "types";

import "@testing-library/jest-dom/extend-expect";

import { PlayerImageCell } from ".";

describe("Player image cell tests", () => {
  const mockOnButtonClick = jest.fn();

  const createComponent = (player?: Player): JSX.Element => {
    return (
      <MockProviders>
        <PlayerImageCell onButtonClick={mockOnButtonClick} player={player} />
      </MockProviders>
    );
  };

  describe("if no player prop is present", () => {
    it("has expected style properties", () => {
      render(createComponent());

      const container = screen.getByTestId("player-image-container-placeholder");
      const placeHolderImageUrl = getPlayerImageUrl();

      expect(container).toHaveStyle(`background-image: url(${placeHolderImageUrl})`);
      expect(container).toHaveStyle(`cursor: pointer`);
      expect(container).toHaveStyle(`borderRadius: 50%`);
    });

    it("has onClick attribute if no player prop was passed", () => {
      render(createComponent());

      const container = screen.getByTestId("player-image-container-placeholder");
      fireEvent.click(container);

      expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
    });

    it("add icon present", () => {
      render(createComponent());

      const container = within(screen.getByTestId("player-image-container-placeholder"));

      expect(container.getByTestId("add-icon")).toBeInTheDocument();
    });

    it("remove icon not present", () => {
      render(createComponent());

      const container = within(screen.getByTestId("player-image-container-placeholder"));

      expect(container.queryByTestId("remove-icon")).toBeNull();
    });
  });

  describe("if a player prop is present", () => {
    const mockPlayer = mockPlayers[0];

    it("has expected style properties", () => {
      render(createComponent(mockPlayer));

      const container = screen.getByTestId(`player-image-container-${mockPlayer.id}`);
      const imageUrl = getPlayerImageUrl(mockPlayer);

      expect(container).toHaveStyle(`background-image: url(${imageUrl})`);
      expect(container).toHaveStyle(`cursor: auto`);
      expect(container).toHaveStyle(`borderRadius: auto`);
    });

    it("has no onClick attribute if a player prop was passed", () => {
      render(createComponent(mockPlayer));

      const container = screen.getByTestId(`player-image-container-${mockPlayer.id}`);
      fireEvent.click(container);

      expect(mockOnButtonClick).toHaveBeenCalledTimes(0);
    });

    it("add icon not present", () => {
      render(createComponent(mockPlayer));

      const container = within(screen.getByTestId(`player-image-container-${mockPlayer.id}`));

      expect(container.queryByTestId("add-icon")).toBeNull();
    });

    it("remove icon present", () => {
      render(createComponent(mockPlayer));

      const container = within(screen.getByTestId(`player-image-container-${mockPlayer.id}`));
      const removeButton = container.getByTestId("remove-icon");

      expect(removeButton).toBeInTheDocument();

      fireEvent.click(removeButton);

      expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
    });
  });
});
