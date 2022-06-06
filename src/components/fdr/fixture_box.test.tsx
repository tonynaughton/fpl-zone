import React from "react";
import { render, screen } from "@testing-library/react";
import { Fixture, Player, Team } from "types";

import { fdrColours } from "components/fdr/difficulty_legend";
import { BaseItem } from "components/fdr/fdr";
import FixtureBox from "components/fdr/fixture_box";

import "@testing-library/jest-dom/extend-expect";

import { mockFixtures, mockPlayers, mockTeams } from "../../test/test_data";

describe("Fixture Box Tests", () => {
  let fixtures: Fixture[];
  let baseItem: BaseItem;
  let isPlayerTable: boolean;
  let allTeams: Team[];

  const getTeamById = (teamId: number): string | undefined => {
    const team = allTeams.find((t) => t.id === teamId);
    return team?.short_name;
  };

  const createComponent = (): JSX.Element => {
    return (
      <FixtureBox
        fixtures={fixtures}
        isPlayerTable={isPlayerTable}
        getTeamById={getTeamById}
        baseItem={baseItem}
      />
    );
  };

  beforeEach(() => {
    fixtures = mockFixtures.slice(0, 2);
    allTeams = mockTeams;
  });

  describe("Player fixture box", () => {
    beforeEach(() => {
      [baseItem] = mockPlayers;
      isPlayerTable = true;
    });

    it("Snapshot test", () => {
      const { asFragment } = render(createComponent());
      expect(asFragment()).toMatchSnapshot();
    });

    it("Opposition team abbreviations displayed as expected", () => {
      render(createComponent());

      const fixtureBox = screen.getByTestId("fixture-box-container");

      const teamId = (baseItem as Player).team;

      fixtures.forEach((fix) => {
        const isHome = fix.team_h === teamId;
        const oppositionId = isHome ? fix.team_a : fix.team_h;
        const difficulty = isHome ? fix.team_h_difficulty : fix.team_a_difficulty;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const teamAbbr = getTeamById(oppositionId)!;
        expect(fixtureBox).toHaveTextContent(teamAbbr);

        const testId = `fix-box-bg-${fix.id}`;
        const difficultyColour = fdrColours[difficulty];
        const singleFixtureBox = screen.getByTestId(testId);
        expect(singleFixtureBox).toHaveStyle(`background-color: ${difficultyColour}`);
      });
    });
  });

  describe("Team fixture box", () => {
    beforeEach(() => {
      [baseItem] = mockTeams;
      isPlayerTable = false;
    });

    it("Snapshot test", () => {
      const { asFragment } = render(createComponent());
      expect(asFragment()).toMatchSnapshot();
    });

    it("Opposition team abbreviations displayed as expected", () => {
      render(createComponent());

      const fixtureBox = screen.getByTestId("fixture-box-container");

      const teamId = (baseItem as Team).id;

      fixtures.forEach((fix) => {
        const isHome = fix.team_h === teamId;
        const oppositionId = isHome ? fix.team_a : fix.team_h;
        const difficulty = isHome ? fix.team_h_difficulty : fix.team_a_difficulty;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const teamAbbr = getTeamById(oppositionId)!;
        expect(fixtureBox).toHaveTextContent(teamAbbr);

        const testId = `fix-box-bg-${fix.id}`;
        const difficultyColour = fdrColours[difficulty];
        const singleFixtureBox = screen.getByTestId(testId);
        expect(singleFixtureBox).toHaveStyle(`background-color: ${difficultyColour}`);
      });
    });
  });
});
