import React from "react";
import { render, screen } from "@testing-library/react";
import { mockPlayers } from "./fixture-data";
import Player from "components/player/player";
import "@testing-library/jest-dom/extend-expect";

describe("Player Tests", () => {
  const mockPlayer = mockPlayers[0];

  const mockHandlePlayerPerformanceClick = (): void => console.log("TEST");

  const createComponent = (): JSX.Element => {
    return (
      <Player
        player={mockPlayer}
        handlePlayerPerformanceClick={mockHandlePlayerPerformanceClick}
        compressed={false}
        multiplier={1}
      />
    );
  };

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  it("Renders player details as expected", () => {
    render(createComponent());

    const playerNameText = screen.getByTestId("player-name");
    expect(playerNameText).toHaveTextContent(mockPlayer.web_name.toUpperCase());

    const playerScoreText = screen.getByTestId("player-score");
    expect(playerScoreText).toHaveTextContent(mockPlayer.event_points.toString());

    const kitImageContainer = screen.getByTestId("kit-img-container") as HTMLImageElement;
    const url = `${process.env.PUBLIC_URL}/assets/images/kits/${mockPlayer.team_code}.png`;
    expect(kitImageContainer).toHaveStyle(`background-image: url(${url})`);
  });
});
