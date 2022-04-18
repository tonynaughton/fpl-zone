import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Results from "components/results/results";
import { mockTeams, mockFixtures, mockPlayers, mockElementStats } from "../../test/test_data";
import { Fixture, Gameweek, Player, PlayerStat, Team } from "types";
import "@testing-library/jest-dom/extend-expect";

describe("Results Tests", () => {
  let teams: Team[];
  let fixtures: Fixture[];
  let latestGameweek: Gameweek;
  let players: Player[];
  let elementStats: PlayerStat[];

  function createComponent(): JSX.Element {
    return (
      <Results
        teams={teams}
        fixtures={fixtures}
        latestGameweek={latestGameweek}
        players={players}
        elementStats={elementStats}
      />
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

  beforeEach(() => {
    teams = mockTeams;
    fixtures = mockFixtures;
    players = mockPlayers;
    elementStats = mockElementStats;
  });

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  it("Gameweek title displays as expected", () => {
    render(createComponent());

    const gameweekTitle = screen.getByTestId("selected-gameweek-title");
    expect(gameweekTitle).toHaveTextContent(mockGameweek.id.toString());
  });

  it("Gameweek fixtures rendered as expected", () => {
    render(createComponent());

    const gameweekResults: Fixture[] = fixtures.filter(
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
      expect(gameweekTitle).toHaveTextContent((mockGameweek.id - 1).toString());
    });

    it("Clicking next gameweek button behaves as expected", () => {
      render(createComponent());

      clickNextGameweekBtn();

      const gameweekTitle = screen.getByTestId("selected-gameweek-title");
      expect(gameweekTitle).toHaveTextContent((mockGameweek.id + 1).toString());
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
