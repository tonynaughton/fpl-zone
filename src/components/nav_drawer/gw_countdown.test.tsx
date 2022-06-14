import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData, mockGameweeks } from "test";

import "@testing-library/jest-dom/extend-expect";

import { GameweekCountdown } from "./gw_countdown";

describe("Gameweek countdown tests", () => {
  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <GameweekCountdown />
      </AppDataContext.Provider>
    );
  };

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  it("Countdown displays correct duration", () => {
    const currentDate = new Date();
    const mockDate = currentDate.setDate(currentDate.getDate() + 5);
    const mockStringDate = new Date(mockDate).toISOString();
    const nextGameweek = mockAppData.gameweeks.find(gw => gw.is_next)!;
    nextGameweek.deadline_time = mockStringDate;

    render(createComponent());

    const expectedText = `GAMEWEEK ${nextGameweek.id} DEADLINE:5 DAYS`;
    const gameweekDeadlineTime = screen.getByTestId("gameweek-deadline-time");

    expect(gameweekDeadlineTime).toHaveTextContent(expectedText);
  });
});
