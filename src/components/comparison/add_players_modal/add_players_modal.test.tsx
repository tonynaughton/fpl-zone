import React from "react";
import { render, screen } from "@testing-library/react";
import { MockProviders } from "test/mock_providers";
import { mockPlayers } from "test/test_data";

import "@testing-library/jest-dom/extend-expect";

import { AddPlayersModal } from "..";

describe("Add players modal tests", () => {
  const mockSelectedPlayers = mockPlayers.splice(0, 2);
  let mockIsAddPlayersModalOpen = true;

  const mockSetAddPlayersModalOpen = jest.fn();
  const mockSetSelectedComparisonPlayers = jest.fn();

  const createComponent = (): JSX.Element => {
    return (
      <MockProviders>
        <AddPlayersModal
          closeAddPlayersModal={mockSetAddPlayersModalOpen}
          isAddPlayersModalOpen={mockIsAddPlayersModalOpen}
          selectedPlayers={mockSelectedPlayers}
          setSelectedPlayers={mockSetSelectedComparisonPlayers}
        />
      </MockProviders>
    );
  };

  describe("Modal visibility", () => {
    it("Visible if isAddPlayersModalOpen is true", () => {
      render(createComponent());

      const modal = screen.getByTestId("add-players-modal");

      expect(modal).toHaveStyle("display: block");
    });

    it("Not visible if isAddPlayersModalOpen is false", () => {
      mockIsAddPlayersModalOpen = false;

      render(createComponent());

      const modal = screen.getByTestId("add-players-modal");

      expect(modal).toHaveStyle("display: none");
    });
  });
});
