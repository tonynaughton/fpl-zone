import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Gameweek, Team } from "types";
import FdrTable, { BaseItem } from "components/fdr/fdr";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockGameweek, mockTeams, mockFixtures, mockPlayers } from "./fixture-data";
import "@testing-library/jest-dom/extend-expect";

describe("FDR Tests", () => {
  let currentGameweek: Gameweek;
  let type: BaseItem[];
  let teams: Team[];

  const mockAdapter = new MockAdapter(axios);

  const mockReturnedFixtures = [mockFixtures.slice(0, 3)];

  mockAdapter.onGet().reply(200, mockReturnedFixtures);

  function createComponent(): JSX.Element {
    return <FdrTable currentGameweek={currentGameweek} type={type} teams={teams} />;
  }

  beforeEach(() => {
    currentGameweek = mockGameweek;
    teams = mockTeams;
  });

  afterEach(cleanup);

  describe("FDR table for teams", () => {
    beforeEach(() => {
      type = mockTeams;
    });

    it("Snapshot test", () => {
      const { asFragment } = render(createComponent());
      expect(asFragment()).toMatchSnapshot();
    });

    it("Displays correct gameweek titles", async () => {
      render(createComponent());

      await waitFor(() => {
        expect(screen.getByTestId("fdr-container")).toBeInTheDocument();
      });

      const columnTitlesRow = screen.getByTestId("table-head-column-title");

      const nextFiveGameweeks = Array(5)
        .fill(currentGameweek.id + 1)
        .map((e, i) => e + i);

      nextFiveGameweeks.forEach((gameweek) => {
        expect(columnTitlesRow).toHaveTextContent(`GW ${gameweek}`);
      });
    });

    it("Displays team names correctly", async () => {
      render(createComponent());

      await waitFor(() => {
        expect(screen.getByTestId("fdr-container")).toBeInTheDocument();
      });

      mockTeams.forEach((team) => {
        const testId = `base-item-${team.name}`;
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });
  });

  describe("FDR table for players", () => {
    const mockSquad = mockPlayers.slice(0, 14);

    beforeEach(() => {
      type = mockSquad;
    });

    it("Snapshot test", () => {
      const { asFragment } = render(createComponent());
      expect(asFragment()).toMatchSnapshot();
    });

    it("Displays player names correctly", async () => {
      render(createComponent());

      await waitFor(() => {
        expect(screen.getByTestId("fdr-container")).toBeInTheDocument();
      });

      mockSquad.forEach((player) => {
        const testId = `base-item-${player.web_name}`;
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });
  });
});
