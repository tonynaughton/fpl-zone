import React from "react";
import { render, screen } from "@testing-library/react";
import { MockProviders } from "test/mock_providers";
import { mockPlayers, mockPlayerStats, mockTeams } from "test/test_data";

import "@testing-library/jest-dom/extend-expect";

import { ComparisonTable,MAX_PLAYER_COUNT } from ".";

describe("Comparison table tests", () => {
  let mockSelectedPlayers = mockPlayers.slice(0, 2);

  const createComponent = (): JSX.Element => {
    return (
      <MockProviders>
        <ComparisonTable
          onAddPlayerClick={jest.fn()}
          onRemovePlayerClick={jest.fn()}
          playerStats={mockPlayerStats}
          selectedPlayers={mockSelectedPlayers}
          teams={mockTeams}
        />
      </MockProviders>
    );
  };

  describe("Player stats", () => {
    it("Stat row rendered as expected", () => {
      render(createComponent());

      mockPlayerStats.forEach((stat) => {
        expect(screen.getByTestId(`stat-row-${stat.name}`)).toBeInTheDocument();
      });
    });

    it("Stat label cell contains label as expected", () => {
      render(createComponent());

      mockPlayerStats.forEach((stat) => {
        const labelCell = screen.getByTestId(`stat-label-cell-${stat.name}`);

        expect(labelCell).toBeInTheDocument();
        expect(labelCell).toHaveTextContent(stat.label);
      });
    });

    it("Stat value cells rendered as expected", () => {
      render(createComponent());

      mockPlayerStats.forEach((stat) => {
        mockSelectedPlayers.forEach((player) => {
          const statValueCell = screen.getByTestId(`stat-value-cell-${stat.name}-${player.id}`);

          expect(statValueCell).toBeInTheDocument();
          expect(statValueCell).toHaveTextContent(player[stat.name]);
        });
      });
    });
  });


  describe("Empty table cell", () => {
    it(`displayed when less than ${MAX_PLAYER_COUNT} players are selected`, () => {
      render(createComponent());

      mockPlayerStats.forEach((stat) => {
        expect(screen.getByTestId(`empty-table-cell=${stat.name}`)).toBeInTheDocument();
      });
    });

    it(`not displayed when ${MAX_PLAYER_COUNT} players are selected`, () => {
      mockSelectedPlayers = mockPlayers.slice(0, MAX_PLAYER_COUNT);

      render(createComponent());

      mockPlayerStats.forEach((stat) => {
        expect(screen.queryByTestId(`empty-table-cell=${stat.name}`)).toBeNull();
      });
    });
  });
});
