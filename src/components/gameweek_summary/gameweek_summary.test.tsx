import React from "react";
import { render, screen } from "@testing-library/react";
import GameweekSummary from "./gameweek_summary";
import { mockAppData, mockPlayers } from "test";
import { GetPlayerById, numberWithCommas } from "helpers";
import { AppDataContext } from "app_content";
import { Gameweek } from "types";
import "@testing-library/jest-dom/extend-expect";

describe("Gameweek Summary Tests", () => {
  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <GameweekSummary />
      </AppDataContext.Provider>
    );
  };

  const gameweek = mockAppData.gameData.events.find((gameweek) => {
    return gameweek.is_current;
  }) as Gameweek;

  it("Renders as expected", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  describe("Data displays correctly", () => {
    it("Highest Score", () => {
      render(createComponent());
      const label = "highest score";

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByTestId(`${label}-stat-value`)).toHaveTextContent(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        gameweek.highest_score!.toString()
      );
    });

    it("Average score", () => {
      render(createComponent());
      const label = "average score";

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByTestId(`${label}-stat-value`)).toHaveTextContent(
        gameweek.average_entry_score.toString()
      );
    });

    it("Star player", () => {
      render(createComponent());
      const label = "star player";
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const starPlayer = GetPlayerById(gameweek.top_element!, mockPlayers);
      const url = `${process.env.PUBLIC_URL}/assets/images/crests/${starPlayer.team_code}.png`;

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByAltText(`${label}-crest-img`)).toHaveAttribute("src", url);
      expect(screen.getByTestId(`${label}-player-name`)).toHaveTextContent(
        `${starPlayer.web_name}`
      );
      expect(screen.getByTestId(`${label}-stat-value`)).toHaveTextContent(
        `${gameweek.top_element_info?.points.toString()} pts`
      );
    });

    it("Most Captained", () => {
      render(createComponent());
      const label = "most captained";
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const mostCaptainedPlayer = GetPlayerById(gameweek.most_captained!, mockPlayers);
      const url = `${process.env.PUBLIC_URL}/assets/images/crests/${mostCaptainedPlayer.team_code}.png`;

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByAltText(`${label}-crest-img`)).toHaveAttribute("src", url);
      expect(screen.getByTestId(`${label}-player-name`)).toHaveTextContent(
        `${mostCaptainedPlayer.web_name}`
      );
    });

    it("Most Vice-captained", () => {
      render(createComponent());
      const label = "most vice-captained";
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const mostViceCaptainedPlayer = GetPlayerById(gameweek.most_vice_captained!, mockPlayers);
      const url = `${process.env.PUBLIC_URL}/assets/images/crests/${mostViceCaptainedPlayer.team_code}.png`;

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByAltText(`${label}-crest-img`)).toHaveAttribute("src", url);
      expect(screen.getByTestId(`${label}-player-name`)).toHaveTextContent(
        `${mostViceCaptainedPlayer.web_name}`
      );
    });

    it("Most Transferred In", () => {
      render(createComponent());
      const label = "most transferred in";
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const mostTransferredInPlayer = GetPlayerById(gameweek.most_transferred_in!, mockPlayers);
      const url = `${process.env.PUBLIC_URL}/assets/images/crests/${mostTransferredInPlayer.team_code}.png`;

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByAltText(`${label}-crest-img`)).toHaveAttribute("src", url);
      expect(screen.getByTestId(`${label}-player-name`)).toHaveTextContent(
        `${mostTransferredInPlayer.web_name}`
      );
      expect(screen.getByTestId(`${label}-stat-value`)).toHaveTextContent(
        numberWithCommas(mostTransferredInPlayer.transfers_in_event)
      );
    });
  });
});
