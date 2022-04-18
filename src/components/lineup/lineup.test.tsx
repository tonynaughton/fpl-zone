import React from "react";
import { render, screen } from "@testing-library/react";
import { mockElementStats, mockPlayers, mockPositions, mockTeams } from "../../test/fixture-data";
import "@testing-library/jest-dom/extend-expect";
import Lineup from "components/lineup/lineup";
import { Player } from "types/player";
import "@testing-library/jest-dom/extend-expect";

describe("Lineup Tests", () => {
  const mockSelected: Player[][] = [];
  mockPositions.slice(0, 10).forEach((pos) => {
    const players: Player[] = [];
    mockPlayers.forEach((player) => {
      player.element_type === pos.id && players.push(player);
    });
    mockSelected.push(players);
  });
  const mockBench = mockPlayers.slice(11, 14) as Player[];
  const createComponent = (): JSX.Element => {
    return (
      <Lineup
        selected={mockSelected}
        bench={mockBench}
        elementStats={mockElementStats}
        teams={mockTeams}
      />
    );
  };
  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });
  describe("Renders lineup as expected", () => {
    it("First XI", () => {
      render(createComponent());
      const selectedGrid = screen.getByTestId("first-xi-players");
      mockSelected.forEach((positionGroup) => {
        positionGroup.forEach((player) => {
          expect(selectedGrid).toHaveTextContent(player.web_name.toUpperCase());
          expect(selectedGrid).toHaveTextContent(player.event_points.toString());
        });
      });
    });
    it("Bench", () => {
      render(createComponent());
      const benchGrid = screen.getByTestId("bench-players");
      mockBench.forEach((player) => {
        expect(benchGrid).toHaveTextContent(player.web_name.toUpperCase());
        expect(benchGrid).toHaveTextContent(player.event_points.toString());
      });
    });
  });
});
