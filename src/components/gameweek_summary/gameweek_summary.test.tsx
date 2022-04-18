import React from "react";
import { render, screen } from "@testing-library/react";
import GameweekSummary from "./gameweek_summary";
import { mockGameweek, mockPlayers } from "../../test/fixture-data";
import { GetPlayerById, numberWithCommas } from "helpers";
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
    it("Highest Score", () => {
      render(createComponent());
      const label = "highest score";

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByTestId(`${label}-stat-value`)).toHaveTextContent(
        mockGameweek.highest_score.toString()
      );
    });

    it("Average score", () => {
      render(createComponent());
      const label = "average score";

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByTestId(`${label}-stat-value`)).toHaveTextContent(
        mockGameweek.average_entry_score.toString()
      );
    });

    it("Star player", () => {
      render(createComponent());
      const label = "star player";
      const starPlayer = GetPlayerById(mockGameweek.top_element, mockPlayers);
      const url = `${process.env.PUBLIC_URL}/assets/images/crests/${starPlayer.team_code}.png`;

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByAltText(`${label}-crest-img`)).toHaveAttribute("src", url);
      expect(screen.getByTestId(`${label}-player-name`)).toHaveTextContent(
        `${starPlayer.first_name} ${starPlayer.second_name}`
      );
      expect(screen.getByTestId(`${label}-stat-value`)).toHaveTextContent(
        starPlayer.event_points.toString()
      );
    });

    it("Most Captained", () => {
      render(createComponent());
      const label = "most captained";
      const mostCaptainedPlayer = GetPlayerById(mockGameweek.most_captained, mockPlayers);
      const url = `${process.env.PUBLIC_URL}/assets/images/crests/${mostCaptainedPlayer.team_code}.png`;

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByAltText(`${label}-crest-img`)).toHaveAttribute("src", url);
      expect(screen.getByTestId(`${label}-player-name`)).toHaveTextContent(
        `${mostCaptainedPlayer.first_name} ${mostCaptainedPlayer.second_name}`
      );
    });

    it("Most Vice-captained", () => {
      render(createComponent());
      const label = "most vice-captained";
      const mostViceCaptainedPlayer = GetPlayerById(mockGameweek.most_vice_captained, mockPlayers);
      const url = `${process.env.PUBLIC_URL}/assets/images/crests/${mostViceCaptainedPlayer.team_code}.png`;

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByAltText(`${label}-crest-img`)).toHaveAttribute("src", url);
      expect(screen.getByTestId(`${label}-player-name`)).toHaveTextContent(
        `${mostViceCaptainedPlayer.first_name} ${mostViceCaptainedPlayer.second_name}`
      );
    });

    it("Most Transferred In", () => {
      render(createComponent());
      const label = "most transferred in";
      const mostTransferredInPlayer = GetPlayerById(mockGameweek.most_transferred_in, mockPlayers);
      const url = `${process.env.PUBLIC_URL}/assets/images/crests/${mostTransferredInPlayer.team_code}.png`;

      expect(screen.getByTestId(`${label}-label`)).toHaveTextContent(label.toUpperCase());
      expect(screen.getByAltText(`${label}-crest-img`)).toHaveAttribute("src", url);
      expect(screen.getByTestId(`${label}-player-name`)).toHaveTextContent(
        `${mostTransferredInPlayer.first_name} ${mostTransferredInPlayer.second_name}`
      );
      expect(screen.getByTestId(`${label}-stat-value`)).toHaveTextContent(
        numberWithCommas(mostTransferredInPlayer.transfers_in_event)
      );
    });
  });
});
