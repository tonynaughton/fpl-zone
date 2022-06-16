import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData, mockPlayers, mockPositions } from "test";
import { Player } from "types/player";

import Lineup from "components/lineup/lineup";

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
      <AppDataContext.Provider value={mockAppData}>
        <Lineup bench={mockBench} selected={mockSelected} />
      </AppDataContext.Provider>
    );
  };


  describe("Renders lineup as expected", () => {
    it("First XI", () => {
      render(createComponent());
      const selectedGrid = screen.getByTestId("first-xi-players");
      mockSelected.forEach((positionGroup) => {
        positionGroup.forEach((player) => {
          expect(selectedGrid).toHaveTextContent(player.web_name);
          expect(selectedGrid).toHaveTextContent(player.event_points.toString());
        });
      });
    });
    it("Bench", () => {
      render(createComponent());
      const benchGrid = screen.getByTestId("bench-players");
      mockBench.forEach((player) => {
        expect(benchGrid).toHaveTextContent(player.web_name);
        expect(benchGrid).toHaveTextContent(player.event_points.toString());
      });
    });
  });
});
