import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { AppDataContext } from "app_content";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { GAME_STATUS_VALUES, getLocalImage } from "helpers";
import { mockAppData,mockFixtures, mockPlayers, mockTeams } from "test";
import { Player } from "types";

import FdrTable from "components/fdr/fdr";

import "@testing-library/jest-dom/extend-expect";

let mockGameweekIds = [11, 12, 13, 14, 15];

jest.mock("hooks/use_next_five_gameweek_ids", () => ({
  useNextFiveGameweekIds: (): number[] => mockGameweekIds
}));

describe("FDR Tests", () => {
  let mockFdrPlayers: Player[];

  const mockAdapter = new MockAdapter(axios);
  const mockReturnedFixtures = [mockFixtures.slice(0, 3)];

  mockAdapter.onGet().reply(200, mockReturnedFixtures);

  const createComponent = (
    playerFdr = false,
    gameweekIds = [11, 12, 13, 14, 15]
  ): JSX.Element => {
    mockGameweekIds = gameweekIds;

    return (
      <AppDataContext.Provider value={mockAppData}>
        <FdrTable players={playerFdr ? mockPlayers : undefined} />
      </AppDataContext.Provider>
    );
  };

  it("displays gameweek numbers correctly", async () => {
    render(createComponent());

    await screen.findByTestId("fdr-container").then(() => {
      const columnTitlesRow = screen.getByTestId("table-head-column-title");

      mockGameweekIds.forEach((id) => {
        expect(columnTitlesRow).toHaveTextContent(`GW ${id}`);
      });
    });
  });

  describe("Team FDR", () => {
    it("displays team names correctly", async () => {
      render(createComponent());

      await screen.findByTestId("fdr-container").then(() => {
        mockTeams.forEach((team) => {
          const teamName = screen.getByTestId(`base-item-${team.name}`);

          expect(teamName).toHaveTextContent(team.name);
        });
      });
    });

    it("displays team crest images correctly", async () => {
      render(createComponent());

      await screen.findByTestId("fdr-container").then(() => {
        mockTeams.forEach((team) => {
          const img = screen.getByTestId(`team-crest-img-${team.name}`);
          const imgUrl = getLocalImage(`crests/${team.code}.png`);

          expect(img).toHaveAttribute("src", imgUrl);
        });
      });
    });
  });

  describe("Player FDR", () => {
    mockFdrPlayers = mockPlayers.slice(0, 14);

    it("Displays player names correctly", async () => {
      render(createComponent(true));

      await screen.findByTestId("fdr-container").then(() => {
        mockFdrPlayers.forEach((player) => {
          const playerName = screen.getByTestId(`base-item-${player.web_name}`);

          expect(playerName).toHaveTextContent(player.web_name);
        });
      });
    });

    it("displays team crest images correctly", async () => {
      render(createComponent(true));

      await screen.findByTestId("fdr-container").then(() => {
        mockFdrPlayers.forEach((player) => {
          const img = screen.getByTestId(`team-crest-img-${player.web_name}`);
          const imgUrl = getLocalImage(`crests/${player.team_code}.png`);

          expect(img).toHaveAttribute("src", imgUrl);
        });
      });
    });
  });

  describe("Notifier", () => {
    it("displays expected message if season has finished", async () => {
      render(createComponent(false, []));

      await screen.findByTestId("notifier-container").then(() => {
        const notifierContainer = screen.getByTestId("notifier-container");
        expect(notifierContainer).toHaveTextContent(GAME_STATUS_VALUES.SEASON_FINISHED);
      });
    });

    it("displays expected message if fixtures are being fetched", async () => {
      render(createComponent());

      await waitFor(() => {
        const notifierContainer = screen.getByTestId("notifier-container");
        expect(notifierContainer).toHaveTextContent("Fetching fixture data..");
      });
    });
  });
});
