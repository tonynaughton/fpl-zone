import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Results from "components/results/results";
import { mockAppData } from "test";
import { Fixture, Gameweek } from "types";
import { AppDataContext } from "app_content";
import "@testing-library/jest-dom/extend-expect";

describe("Results Tests", () => {
  const latestGameweek = mockAppData.gameData.events.find(
    (gameweek) => gameweek.is_current
  ) as Gameweek;

  function createComponent(): JSX.Element {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <Results />
      </AppDataContext.Provider>
    );
  }

  function clickPrevGameweekBtn(): void {
    const prevGameweekBtn = screen.getByTestId("prev-gameweek-btn");
    fireEvent.click(prevGameweekBtn);
  }

  function clickNextGameweekBtn(): void {
    const nextGameweekBtn = screen.getByTestId("next-gameweek-btn");
    fireEvent.click(nextGameweekBtn);
  }
  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  it("Gameweek title displays as expected", () => {
    render(createComponent());

    const gameweekTitle = screen.getByTestId("selected-gameweek-title");
    expect(gameweekTitle).toHaveTextContent(latestGameweek.id.toString());
  });

  it("Gameweek fixtures rendered as expected", () => {
    render(createComponent());

    const gameweekResults: Fixture[] = mockAppData.fixtureData.filter(
      (fixture) => fixture.event === latestGameweek.id
    );

    gameweekResults.forEach((result) => {
      const resultDetails = screen.getByTestId("result-" + result.id);
      expect(resultDetails).toBeDefined();
    });
  });

  describe("Next and previous buttons", () => {
    it("Clicking prev gameweek button behaves as expected", () => {
      render(createComponent());

      clickPrevGameweekBtn();

      const gameweekTitle = screen.getByTestId("selected-gameweek-title");
      expect(gameweekTitle).toHaveTextContent((latestGameweek.id - 1).toString());
    });

    it("Clicking next gameweek button behaves as expected", () => {
      render(createComponent());

      clickNextGameweekBtn();

      const gameweekTitle = screen.getByTestId("selected-gameweek-title");
      expect(gameweekTitle).toHaveTextContent((latestGameweek.id + 1).toString());
    });

    it("Prev gameweek button disabled when selected gameweek is 1", () => {
      latestGameweek.id = 1;

      render(createComponent());

      const prevGameweekBtn = screen.getByTestId("prev-gameweek-btn");
      expect(prevGameweekBtn).toBeDisabled();
    });

    it("Next gameweek button disabled when selected gameweek is 38", () => {
      latestGameweek.id = 38;

      render(createComponent());

      const nextGameweekBtn = screen.getByTestId("next-gameweek-btn");
      expect(nextGameweekBtn).toBeDisabled();
    });
  });
});
