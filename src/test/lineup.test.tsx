import React from "react";
import { render, screen } from "@testing-library/react";
import { mockPlayers, mockPositions } from "./fixture-data";
import "@testing-library/jest-dom/extend-expect";
import Lineup from "components/lineup/lineup";
import { Player } from "types/player";
import "@testing-library/jest-dom/extend-expect";

describe("Lineup Tests", () => {
  const mockFirstXI: Player[][] = [];
  mockPositions.slice(0, 10).forEach((pos) => {
    const players: Player[] = [];
    mockPlayers.forEach((player) => {
      player.element_type === pos.id && players.push(player);
    });
    mockFirstXI.push(players);
  });
  const mockBench = mockPlayers.slice(11, 14) as Player[];

  const createComponent = (): JSX.Element => {
    return <Lineup firstXI={mockFirstXI} bench={mockBench} />;
  };

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  describe("Renders lineup as expected", () => {
    it("First XI", () => {
      render(createComponent());
      const firstXIGrid = screen.getByTestId("first-xi-players");
      mockFirstXI.forEach((positionGroup) => {
        positionGroup.forEach((player) => {
          expect(firstXIGrid).toHaveTextContent(player.web_name.toUpperCase());
          expect(firstXIGrid).toHaveTextContent(player.event_points.toString());
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
