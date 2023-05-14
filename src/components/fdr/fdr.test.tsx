import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getLocalImgUrl } from "helpers";
import { mockFixtures, mockPlayers, mockTeams } from "test";
import { MockProviders } from "test/mock_providers";
import { Player } from "types";

import FdrTable from "components/fdr/fdr";
import { notifierMessageMap as msgMap } from "components/layout";

import "@testing-library/jest-dom/extend-expect";

let mockGameweekIds = [11, 12, 13, 14, 15];

jest.mock("hooks/use_next_gameweek_ids", () => ({
  useNextGameweekIds: (): number[] => mockGameweekIds
}));

describe("FDR Tests", () => {
  let mockFdrPlayers: Player[] | undefined;

  const mockAdapter = new MockAdapter(axios);
  const mockReturnedFixtures = [mockFixtures.slice(0, 3)];

  mockAdapter.onGet().reply(200, mockReturnedFixtures);

  const createComponent = (): JSX.Element => {
    return (
      <MockProviders>
        <FdrTable players={mockFdrPlayers} />
      </MockProviders>
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
    beforeEach(() => {
      mockFdrPlayers = undefined;
    });

    it("displays team names correctly", async () => {
      render(createComponent());

      await screen.findByTestId("fdr-container").then(() => {
        mockTeams.forEach((team) => {
          const teamName = screen.getByTestId(`base-item-text-${team.id}`);

          expect(teamName).toHaveTextContent(team.name);
        });
      });
    });

    it("displays team crest images correctly", async () => {
      render(createComponent());

      await screen.findByTestId("fdr-container").then(() => {
        mockTeams.forEach((team) => {
          const img = screen.getByTestId(`base-item-crest-img-${team.id}`);
          const imgUrl = getLocalImgUrl(`crests/${team.code}.png`);

          expect(img).toHaveAttribute("src", imgUrl);
        });
      });
    });
  });

  describe("Player FDR", () => {
    beforeEach(() => {
      mockFdrPlayers = mockPlayers.slice(0, 14);
    });

    it("Displays player names correctly", async () => {
      render(createComponent());

      await screen.findByTestId("fdr-container").then(() => {
        mockFdrPlayers?.forEach((player) => {
          const playerName = screen.getByTestId(`base-item-text-${player.id}`);

          expect(playerName).toHaveTextContent(player.web_name);
        });
      });
    });

    it("displays team crest images correctly", async () => {
      render(createComponent());

      await screen.findByTestId("fdr-container").then(() => {
        mockFdrPlayers?.forEach((player) => {
          const img = screen.getByTestId(`base-item-crest-img-${player.id}`);
          const imgUrl = getLocalImgUrl(`crests/${player.team_code}.png`);

          expect(img).toHaveAttribute("src", imgUrl);
        });
      });
    });
  });

  describe("Notifier", () => {
    it("displays expected message if season has finished", () => {
      mockGameweekIds = [];

      render(createComponent());

      expect(screen.getByTestId("notifier")).toHaveTextContent(msgMap.seasonFinished);
    });

    it("displays expected message if fixtures are being fetched", async () => {
      mockGameweekIds = [11, 12, 13, 14, 15];

      render(createComponent());

      await waitFor(() => {
        expect(screen.getByTestId("notifier")).toHaveTextContent("Fetching fixture data..");
      });
    });
  });
});
