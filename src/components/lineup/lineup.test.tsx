import React from "react";
import { render, screen, within } from "@testing-library/react";
import { getLocalImage } from "helpers";
import _ from "lodash";
import { mockPlayers } from "test";
import { MockProviders } from "test/mock_providers";
import { Lineup as LineupType,TeamData, TeamPicks } from "types";

import Lineup from "components/lineup/lineup";

import "@testing-library/jest-dom/extend-expect";

describe("Lineup Tests", () => {
  let mockTeamPicks: TeamPicks;
  let mockTeamData: TeamData;
  let mockLineup: LineupType;

  const mockSelected = _(mockPlayers)
    .partition("element_type")
    .value()
    .map(pos => pos.splice(0, 3));

  const mockBench = mockPlayers.filter((p => !(mockSelected.flat()).includes(p))).splice(0, 4);

  const createComponent = (): JSX.Element => {
    return (
      <MockProviders>
        <Lineup
          lineup={mockLineup}
          teamData={mockTeamData}
          teamPicks={mockTeamPicks}
        />
      </MockProviders>
    );
  };

  it("Selected players displayed correctly", () => {
    render(createComponent());

    const selectedContainer = within(screen.getByTestId("selected-players"));

    mockSelected.forEach((position) => {
      position.forEach((player) => {
        const container = selectedContainer.getByTestId(`player-container-${player.id}`);

        expect(container).toHaveTextContent(player.web_name.toUpperCase());
        expect(container).toHaveTextContent(player.event_points.toString());

        const kitImg = selectedContainer.getByTestId(`kit-img-player-${player.id}`);
        const imgUrl = getLocalImage(`kits/${player.team_code}.png`);

        expect(kitImg).toHaveAttribute("src", imgUrl);
      });
    });
  });

  it("Bench players displayed correctly", () => {
    render(createComponent());

    const benchContainer = within(screen.getByTestId("bench-players"));

    mockBench.forEach((player) => {
      const container = benchContainer.getByTestId(`player-container-${player.id}`);

      expect(container).toHaveTextContent(player.web_name.toUpperCase());
      expect(container).toHaveTextContent(player.event_points.toString());

      const kitImg = screen.getByTestId(`kit-img-player-${player.id}`);
      const imgUrl = getLocalImage(`kits/${player.team_code}.png`);

      expect(kitImg).toHaveAttribute("src", imgUrl);
    });
  });

  describe("Team picks prop", () => {
    const mockCaptainId = mockSelected[0][0].id;
    const mockViceCaptainId = mockSelected[0][1].id;

    mockTeamPicks = {
      picks: [
        {
          element: mockCaptainId,
          is_captain: true
        },
        {
          element: mockViceCaptainId,
          is_vice_captain: true
        }
      ]
    } as unknown as TeamPicks;

    it("renders Armband component with \"C\" if player is vice-captain", () => {
      render(createComponent());

      const playerOneContainer = within(screen.getByTestId(`player-container-${mockCaptainId}`));

      expect(playerOneContainer.getByTestId("armband-container")).toHaveTextContent("C");
      expect(playerOneContainer.getByTestId("armband-container")).not.toHaveTextContent("VC");

    });
    it("renders Armband component with \"V\" if player is vice-captain", () => {
      render(createComponent());

      const playerTwoContainer = within(screen.getByTestId(`player-container-${mockViceCaptainId}`));

      expect(playerTwoContainer.getByTestId("armband-container")).not.toHaveTextContent("C");
      expect(playerTwoContainer.getByTestId("armband-container")).toHaveTextContent("V");

    });
    it("does not display render Armband component when player is not captain or vice-captain", () => {
      render(createComponent());

      const playerWithNoArmbandId = mockSelected[0][2].id;

      const playerThreeContainer = within(screen.getByTestId(`player-container-${playerWithNoArmbandId}`));

      expect(playerThreeContainer.queryByTestId("armband-container")).toBeNull();
    });
  });
});
