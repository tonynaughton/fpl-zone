import React from "react";
import { render, screen } from "@testing-library/react";
import { numberWithCommas } from "helpers";
import { MockProviders } from "test/mock_providers";
import { TeamData, TeamPicks } from "types";

import "@testing-library/jest-dom/extend-expect";

import { LineupDetails } from "./lineup_details";

describe("Lineup details tests", () => {
  let mockTeamData: TeamData;
  let mockTeamPicks: TeamPicks;

  const createComponent = (): JSX.Element => {
    return (
      <MockProviders>
        <LineupDetails
          teamData={mockTeamData}
          teamPicks={mockTeamPicks}
        />
      </MockProviders>
    );
  };

  beforeEach(() => {
    mockTeamData = {
      name: "mock team name",
      summary_overall_rank: 1000,
      summary_event_points: 68
    } as TeamData;

    mockTeamPicks = {
      active_chip: "WILDCARD"
    } as TeamPicks;
  });

  it("Team name displayed correctly", () => {
    render(createComponent());

    expect(screen.getByTestId("team-name")).toHaveTextContent(mockTeamData.name);
  });

  describe("Active chip", () => {
    it("displayed correctly if prop is defined", () => {
      render(createComponent());

      expect(screen.getByTestId("active-chip")).toHaveTextContent(mockTeamPicks.active_chip.toUpperCase());
    });

    it("Displays as \"None\" if prop is undefined", () => {
      mockTeamPicks.active_chip = "";

      render(createComponent());

      expect(screen.getByTestId("active-chip")).toHaveTextContent("None");
    });
  });

  it("Total points displayed correctly", () => {
    render(createComponent());

    expect(screen.getByTestId("total-points")).toHaveTextContent(mockTeamData.summary_event_points.toString());
  });

  it("Overall rank displayed correctly", () => {
    render(createComponent());

    const expectedText = numberWithCommas(mockTeamData.summary_overall_rank);
    expect(screen.getByTestId("overall-rank")).toHaveTextContent(expectedText);
  });
});
