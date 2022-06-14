import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData, mockPlayers } from "test/test_data";

import "@testing-library/jest-dom/extend-expect";

import { AddPlayersModal } from "..";

describe("Add players modal tests", () => {
  let mockSelectedPlayers = mockPlayers.splice(0, 2);
  let mockIsAddPlayersModalOpen = true;

  const mockSetAddPlayersModalOpen = jest.fn();
  const mockSetSelectedComparisonPlayers = jest.fn();

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <AddPlayersModal
          isAddPlayersModalOpen={mockIsAddPlayersModalOpen}
          selectedPlayers={mockSelectedPlayers}
          setAddPlayersModalOpen={mockSetAddPlayersModalOpen}
          setSelectedComparisonPlayers={mockSetSelectedComparisonPlayers}
        />
      </AppDataContext.Provider>
    );
  };

  it("Snapshot test", () => {
    mockSelectedPlayers = mockPlayers.slice(0, 2);

    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

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
