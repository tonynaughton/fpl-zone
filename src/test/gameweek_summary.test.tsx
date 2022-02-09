import React from "react";
import { render, screen } from "@testing-library/react";
import GameweekSummary from "../components/gameweek_summary/gameweek_summary";
import { mockGameweek, mockPlayers } from "./fixture-data";
import { GetPlayerById } from "helpers";
import "@testing-library/jest-dom/extend-expect";

describe("Gameweek Summary Tests", () => {
  const createComponent = (): JSX.Element => {
    return <GameweekSummary gameweek={mockGameweek} players={mockPlayers} />;
  };

  it("Renders as expected", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  describe("Data displays correctly", () => {
    it("Star player", () => {
      render(createComponent());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const starPlayer = GetPlayerById(mockGameweek.top_element, mockPlayers)!;
      expect(screen.getByTestId("star player:")).toHaveTextContent(starPlayer.web_name);
    });

    it("Most Captained", () => {
      render(createComponent());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const mostCaptainedPlayer = GetPlayerById(mockGameweek.most_captained, mockPlayers)!;
      expect(screen.getByTestId("most captained:")).toHaveTextContent(mostCaptainedPlayer.web_name);
    });

    it("Highest Score", () => {
      render(createComponent());
      expect(screen.getByTestId("highest score:")).toHaveTextContent(
        mockGameweek.highest_score.toString()
      );
    });

    it("Most Transferred In", () => {
      render(createComponent());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const mostTransfInPlayer = GetPlayerById(mockGameweek.most_transferred_in, mockPlayers)!;
      expect(screen.getByTestId("most transferred in:")).toHaveTextContent(
        mostTransfInPlayer.web_name
      );
    });

    it("Most Vice-captained", () => {
      render(createComponent());
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const mostViceCaptPlayer = GetPlayerById(mockGameweek.most_vice_captained, mockPlayers)!;
      expect(screen.getByTestId("most vice-captained:")).toHaveTextContent(
        mostViceCaptPlayer.web_name
      );
    });

    it("Average score", () => {
      render(createComponent());
      expect(screen.getByTestId("average score:")).toHaveTextContent(
        mockGameweek.average_entry_score.toString()
      );
    });
  });
});
