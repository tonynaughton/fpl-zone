import React from "react";
import { render, screen } from "@testing-library/react";
import { formatNumber } from "helpers";
import { MockProviders } from "test/mock_providers";

import "@testing-library/jest-dom/extend-expect";

import { LineupDetails, TeamStats } from "./lineup_details";

describe.only("Lineup details tests", () => {
  let mockTeamName: string;
  let mockTeamStats: TeamStats;

  const createComponent = (): JSX.Element => {
    return (
      <MockProviders>
        <LineupDetails
          teamName={mockTeamName}
          teamStats={mockTeamStats}
        />
      </MockProviders>
    );
  };

  beforeEach(() => {
    mockTeamName = "mock team name";

    mockTeamStats = {
      activeChip: "BENCH BOOST",
      totalPoints: 70,
      overallRank: 100000
    };
  });

  it("Team name displayed correctly", () => {
    render(createComponent());

    expect(screen.getByTestId("team-name")).toHaveTextContent(mockTeamName);
  });

  it("Active chip displayed correctly", () => {
    render(createComponent());

    expect(screen.getByTestId("active-chip")).toHaveTextContent(mockTeamStats.activeChip);
  });

  it("Total points displayed correctly", () => {
    render(createComponent());

    expect(screen.getByTestId("total-points")).toHaveTextContent(mockTeamStats.totalPoints.toString());
  });

  it("Overall rank displayed correctly", () => {
    render(createComponent());

    const expectedText = formatNumber(mockTeamStats.overallRank);
    expect(screen.getByTestId("overall-rank")).toHaveTextContent(expectedText);
  });
});
