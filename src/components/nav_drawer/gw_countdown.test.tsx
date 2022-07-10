import React from "react";
import { render, screen } from "@testing-library/react";
import moment from "moment";
import { mockAppData } from "test";
import { MockProviders } from "test/mock_providers";

import "@testing-library/jest-dom/extend-expect";

import { GameweekCountdown } from "./gw_countdown";

describe("Gameweek countdown tests", () => {
  const createComponent = (): JSX.Element => {
    return (
      <MockProviders>
        <GameweekCountdown />
      </MockProviders>
    );
  };

  const setGameweekDeadline = (days = 0, hours = 0, minutes = 0): void => {
    const currentDate = moment();
    const mockDeadlineDate = currentDate.add({ days, hours, minutes }).toISOString();
    const nextGameweek = mockAppData.gameweeks.find(gw => gw.is_next)!;
    nextGameweek.deadline_time = mockDeadlineDate;
  };

  const nextGameweekName = "GW 34 DEADLINE";

  it("Days, hours and minutes", () => {
    setGameweekDeadline(2, 16, 27);
    render(createComponent());

    const expectedCountdownText = "2 DAYS 16 HRS 27 MINS";
    const gameweekDeadlineText = screen.getByTestId("gameweek-deadline-text");

    expect(gameweekDeadlineText).toHaveTextContent(nextGameweekName);
    expect(gameweekDeadlineText).toHaveTextContent(expectedCountdownText);
  });

  it("Hours and minutes only", () => {
    setGameweekDeadline(0, 3, 52);
    render(createComponent());

    const expectedCountdownText = "3 HRS 52 MINS";
    const gameweekDeadlineText = screen.getByTestId("gameweek-deadline-text");

    expect(gameweekDeadlineText).toHaveTextContent(nextGameweekName);
    expect(gameweekDeadlineText).toHaveTextContent(expectedCountdownText);
  });

  it("Minutes only", () => {
    setGameweekDeadline(0, 0, 12);
    render(createComponent());

    const expectedCountdownText = "12 MINS";
    const gameweekDeadlineText = screen.getByTestId("gameweek-deadline-text");

    expect(gameweekDeadlineText).toHaveTextContent(nextGameweekName);
    expect(gameweekDeadlineText).toHaveTextContent(expectedCountdownText);
  });

  it("Singular times", () => {
    setGameweekDeadline(1, 1, 1);
    render(createComponent());

    const expectedCountdownText = "1 DAY 1 HR 1 MIN";
    const gameweekDeadlineText = screen.getByTestId("gameweek-deadline-text");

    expect(gameweekDeadlineText).toHaveTextContent(nextGameweekName);
    expect(gameweekDeadlineText).toHaveTextContent(expectedCountdownText);
  });

  it("Displays \"Gameweek in progress\" if duration has elapsed", () => {
    setGameweekDeadline();
    render(createComponent());

    const expectedCountdownText = "IN PROGRESS";
    const gameweekDeadlineText = screen.getByTestId("gameweek-deadline-text");

    expect(gameweekDeadlineText).toHaveTextContent(expectedCountdownText);
  });
});
