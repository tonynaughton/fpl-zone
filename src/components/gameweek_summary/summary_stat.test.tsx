import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData } from "test";

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
      <AppDataContext.Provider value={mockAppData}>
        <SummaryStat stat={mockSummaryStat} />
      </AppDataContext.Provider>
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
    const imgUrl = `${process.env.PUBLIC_URL}/assets/images/crests/${mockSummaryStat.teamCode}.png`;

    expect(teamCrestImg).toHaveAttribute("src", imgUrl);
  });
});