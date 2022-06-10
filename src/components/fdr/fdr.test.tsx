import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockAppData,mockFixtures, mockPlayers, mockTeams } from "test";
import { Gameweek, Player } from "types";

import FdrTable from "components/fdr/fdr";

import "@testing-library/jest-dom/extend-expect";

describe("FDR Tests", () => {
  const mockAdapter = new MockAdapter(axios);

  const mockReturnedFixtures = [mockFixtures.slice(0, 3)];

  mockAdapter.onGet().reply(200, mockReturnedFixtures);

  const createComponent = (players?: Player[]): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <FdrTable players={players} />
      </AppDataContext.Provider>
    );
  };

  afterEach(cleanup);

  describe("FDR table for teams", () => {
    it("Snapshot test", () => {
      const { asFragment } = render(createComponent());
      expect(asFragment()).toMatchSnapshot();
    });

    it("Displays correct gameweek titles", async () => {
      render(createComponent());

      await screen.findByTestId("fdr-container").then(() => {
        const columnTitlesRow = screen.getByTestId("table-head-column-title");

        const currentGameweek = mockAppData.gameweeks.find(
          (gameweek) => gameweek.is_current
        ) as Gameweek;
        const nextFiveGameweeks: number[] = [];
        // eslint-disable-next-line no-loops/no-loops
        for (let x = currentGameweek.id; x <= 38 && nextFiveGameweeks.length < 5; x++) {
          nextFiveGameweeks.push(x);
        }

        nextFiveGameweeks.forEach((gameweek) => {
          expect(columnTitlesRow).toHaveTextContent(`GW ${gameweek}`);
        });
      });
    });

    it("Displays team names correctly", async () => {
      render(createComponent());

      await screen.findByTestId("fdr-container").then(() => {
        mockTeams.forEach((team) => {
          const testId = `base-item-${team.name}`;
          expect(screen.getByTestId(testId)).toBeInTheDocument();
        });
      });
    });
  });

  describe("FDR table for players", () => {
    const mockSquad = mockPlayers.slice(0, 14);

    it("Snapshot test", () => {
      const { asFragment } = render(createComponent());
      expect(asFragment()).toMatchSnapshot();
    });

    it("Displays player names correctly", async () => {
      render(createComponent(mockPlayers));

      await screen.findByTestId("fdr-container").then(() => {
        mockSquad.forEach((player) => {
          const testId = `base-item-${player.web_name}`;
          expect(screen.getByTestId(testId)).toBeInTheDocument();
        });
      });
    });
  });
});
