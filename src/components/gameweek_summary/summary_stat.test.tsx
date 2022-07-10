import React from "react";
import { render, screen } from "@testing-library/react";
import { getTeamCrestImageUrl } from "helpers";
import { MockProviders } from "test/mock_providers";

import "@testing-library/jest-dom/extend-expect";

import { SummaryStatType } from "./gameweek_summary";
import { SummaryStat } from "./summary_stat";

describe("Summary Stat Tests", () => {
  const mockStatValue = "23 pts";

  const mockSummaryStat = {
    label: "star player",
    teamCode: 10,
    playerName: "Mock Player Name",
    value: mockStatValue
  } as SummaryStatType;

  const createComponent = (): JSX.Element => {
    return (
      <MockProviders>
        <SummaryStat stat={mockSummaryStat} />
      </MockProviders>
    );
  };

  it("Stat label displays correctly", () => {
    render(createComponent());

    const statLabelText = screen.getByTestId(`stat-label-text-${mockSummaryStat.label}`);

    expect(statLabelText).toHaveTextContent(mockSummaryStat.label.toUpperCase());
  });

  it("Stat value displays correctly", () => {
    render(createComponent());

    const statLabelText = screen.getByTestId(`stat-value-text-${mockSummaryStat.label}`);

    expect(statLabelText).toHaveTextContent(mockStatValue);
  });

  it("Team crest image displays correctly", () => {
    render(createComponent());

    const teamCrestImg = screen.getByTestId(`team-crest-img-${mockSummaryStat.label}`);
    const imgUrl = getTeamCrestImageUrl(mockSummaryStat.teamCode!);


    expect(teamCrestImg).toHaveAttribute("src", imgUrl);
  });
});
