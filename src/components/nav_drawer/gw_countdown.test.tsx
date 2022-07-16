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

  const mockNextGameweek = mockAppData.gameweeks.find(gw => gw.is_next)!;

  const setGameweekDeadline = (seconds = 0, minutes = 0, hours = 0, days = 0): void => {
    const mockDeadlineDate = moment().add({ days, hours, minutes, seconds })
      .toISOString();
    mockNextGameweek.deadline_time = mockDeadlineDate;
  };

  describe("Title", () => {
    it("Displays gameweek deadline message if countdown has not completed", () => {
      const title = `GW ${mockNextGameweek.id} DEADLINE`;
      setGameweekDeadline(1, 1, 1, 1);
      render(createComponent());

      expect(screen.getByTestId("gameweek-deadline-container")).toHaveTextContent(title);
    });

    it("Displays \"Gameweek in progress\" if countdown has completed", () => {
      const title = `GAMEWEEK ${mockNextGameweek.id} IN PROGRESS`;
      setGameweekDeadline();
      render(createComponent());

      expect(screen.getByTestId("gameweek-deadline-container")).toHaveTextContent(title);
    });
  });

  describe("Time values", () => {
    it("Days, hours, minutes and seconds", () => {
      setGameweekDeadline(3, 27, 16, 2);
      render(createComponent());

      const container = screen.getByTestId("gameweek-deadline-container");

      expect(container).toHaveTextContent("02DAYS");
      expect(container).toHaveTextContent("16HRS");
      expect(container).toHaveTextContent("27MINS");
      expect(container).toHaveTextContent("03SECS");
    });

    it("Hours, minutes and seconds only", () => {
      setGameweekDeadline(16, 52, 3);
      render(createComponent());

      const container = screen.getByTestId("gameweek-deadline-container");


      expect(container).toHaveTextContent("00DAYS");
      expect(container).toHaveTextContent("03HRS");
      expect(container).toHaveTextContent("52MINS");
      expect(container).toHaveTextContent("16SECS");
    });

    it("Minutes and seconds only", () => {
      setGameweekDeadline(46, 12);
      render(createComponent());

      const container = screen.getByTestId("gameweek-deadline-container");


      expect(container).toHaveTextContent("00DAYS");
      expect(container).toHaveTextContent("00HRS");
      expect(container).toHaveTextContent("12MINS");
      expect(container).toHaveTextContent("46SECS");
    });

    it("Seconds only", () => {
      setGameweekDeadline(12);
      render(createComponent());

      const container = screen.getByTestId("gameweek-deadline-container");


      expect(container).toHaveTextContent("00DAYS");
      expect(container).toHaveTextContent("00HRS");
      expect(container).toHaveTextContent("00MINS");
      expect(container).toHaveTextContent("12SECS");
    });
  });
});
