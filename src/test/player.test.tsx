import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { mockPlayers } from "./fixture-data";
import Player from "components/player/player";
import { Player as PlayerType } from "types";
import "@testing-library/jest-dom/extend-expect";

describe("Player Tests", () => {
  let mockPlayer: PlayerType;
  let mockMultiplier: number;
  let mockIsCaptain: boolean;
  let mockIsViceCaptain: boolean;

  const mockHandlePlayerPerformanceClick = (): void => console.log("TEST");

  const createComponent = (): JSX.Element => {
    return (
      <Player
        player={mockPlayer}
        handlePlayerPerformanceClick={mockHandlePlayerPerformanceClick}
        compressed={false}
        multiplier={mockMultiplier}
        isCaptain={mockIsCaptain}
        isViceCaptain={mockIsViceCaptain}
      />
    );
  };

  beforeEach(() => {
    mockPlayer = mockPlayers[0];
    mockMultiplier = 1;
    mockIsCaptain = false;
    mockIsViceCaptain = false;
  });

  afterEach(cleanup);

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  it("Renders player name as expected", () => {
    render(createComponent());

    const playerNameText = screen.getByTestId("player-name");
    expect(playerNameText).toHaveTextContent(mockPlayer.web_name.toUpperCase());
  });

  it("Renders player score as expected", () => {
    render(createComponent());

    const playerScoreText = screen.getByTestId("player-score");
    expect(playerScoreText).toHaveTextContent(mockPlayer.event_points.toString());
  });

  it("Renders player kit image as expected", () => {
    render(createComponent());

    const kitImageContainer = screen.getByTestId("kit-img-container") as HTMLImageElement;
    const url = `${process.env.PUBLIC_URL}/assets/images/kits/${mockPlayer.team_code}.png`;
    expect(kitImageContainer).toHaveStyle(`background-image: url(${url})`);
  });

  it("Multipler works as expected", () => {
    mockMultiplier = 2;

    render(createComponent());

    const playerScoreText = screen.getByTestId("player-score");
    const multipliedScore = mockPlayer.event_points * mockMultiplier;

    expect(playerScoreText).toHaveTextContent(multipliedScore.toString());
  });

  describe("Renders armband as expected", () => {
    it("Renders no armband if player is neither captain or vice", () => {
      render(createComponent());

      expect(screen.queryByTestId("armband-container")).toBeNull();
    });

    it("Renders captain armband if player captain", () => {
      mockIsCaptain = true;

      render(createComponent());

      expect(screen.getByTestId("armband-container")).toHaveTextContent("C");
    });

    it("Renders vice captain armband if player vice captain", () => {
      mockIsViceCaptain = true;

      render(createComponent());

      expect(screen.getByTestId("armband-container")).toHaveTextContent("V");
    });
  });
});
