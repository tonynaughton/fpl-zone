import React from "react";
import { render, screen, within } from "@testing-library/react";
import { AppDataContext } from "app_content";
import _ from "lodash";
import { mockAppData, mockPlayers } from "test";
import { TeamData, TeamPicks } from "types";
import { Player } from "types/player";

import Lineup from "components/lineup/lineup";

import "@testing-library/jest-dom/extend-expect";

describe("Lineup Tests", () => {
  let mockCompressed: boolean;
  let mockSelected: Player[][];
  let mockBench: Player[];
  let mockTeamPicks: TeamPicks;
  let mockTeamData: TeamData;

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <Lineup
          bench={mockBench}
          compressed={mockCompressed}
          selected={mockSelected}
          teamData={mockTeamData}
          teamPicks={mockTeamPicks}
        />
      </AppDataContext.Provider>
    );
  };

  beforeEach(() => {
    mockSelected = _(mockPlayers)
      .partition("element_type")
      .value()
      .map(pos => pos.splice(0, 3));

    mockBench = mockPlayers.filter((p => !(mockSelected.flat()).includes(p))).splice(0, 4);
  });

  it("Selected players displayed correctly", () => {
    render(createComponent());

    const selectedContainer = within(screen.getByTestId("selected-players"));

    mockSelected.forEach((position) => {
      position.forEach((player) => {
        const container = selectedContainer.getByTestId(`player-container-${player.id}`);

        expect(container).toHaveTextContent(player.web_name);
        expect(container).toHaveTextContent(player.event_points.toString());

        const imgContainer = selectedContainer.getByTestId(`kit-img-container-${player.id}`);
        const url = `${process.env.PUBLIC_URL}/assets/images/kits/${player.team_code}.png`;

        expect(imgContainer).toHaveStyle(`background-image: url(${url})`);
      });
    });
  });

  it("Bench players displayed correctly", () => {
    render(createComponent());

    const benchContainer = within(screen.getByTestId("bench-players"));

    mockBench.forEach((player) => {
      const container = benchContainer.getByTestId(`player-container-${player.id}`);

      expect(container).toHaveTextContent(player.web_name);
      expect(container).toHaveTextContent(player.event_points.toString());

      const imgContainer = screen.getByTestId(`kit-img-container-${player.id}`);
      const url = `${process.env.PUBLIC_URL}/assets/images/kits/${player.team_code}.png`;

      expect(imgContainer).toHaveStyle(`background-image: url(${url})`);
    });
  });
});
