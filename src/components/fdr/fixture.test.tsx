import React from "react";
import { useTheme } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { mockAppData, mockFixtures, mockPlayers, mockTeams } from "test/test_data";
import { Fixture as FixtureType, Player, Team } from "types";

import { BaseItem } from "components/fdr/fdr";

import "@testing-library/jest-dom/extend-expect";

import { Fixture } from "./fixture";

describe("Fixture Tests", () => {
  const theme = useTheme();

  let mockFixturesProp: FixtureType[];
  let mockBaseItem: BaseItem;

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <Fixture
          baseItem={mockBaseItem}
          fixtures={mockFixturesProp}
        />
      </AppDataContext.Provider>
    );
  };

  const testTextValue = (fixture: FixtureType, teamId: number): void => {
    const isHome = fixture.team_h === teamId;
    const oppositionId = isHome ? fixture.team_a : fixture.team_h;
    const oppositionAbbreviation = getTeamById(oppositionId, mockTeams)!.short_name;
    const fixtureContainer = screen.getByTestId("fixture-container");
    const homeOrAwayText = isHome ? "(H)" : "(A)";

    expect(fixtureContainer).toHaveTextContent(`${oppositionAbbreviation} ${homeOrAwayText}`);
  };

  const testContainerBackground = (fixture: FixtureType, teamId: number): void => {
    const isHome = fixture.team_h === teamId;
    const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;
    const difficultyColour = theme.palette.fdr[difficulty];
    const singleFixtureBox = screen.getByTestId(`fixture-container-bg-${fixture.id}`);

    expect(singleFixtureBox).toHaveStyle(`background-color: ${difficultyColour}`);
  };

  it("Player FDR displays correctly", () => {
    mockBaseItem = mockPlayers[0];
    mockFixturesProp = mockFixtures.slice(0, 2);

    render(createComponent());

    const teamId = (mockBaseItem as Player).team;

    mockFixturesProp.forEach((fixture) => {
      testTextValue(fixture, teamId);
      testContainerBackground(fixture, teamId);
    });
  });

  it("Team FDR displays correctly", () => {
    mockBaseItem = mockTeams[0];
    mockFixturesProp = mockFixtures.slice(0, 2);

    render(createComponent());

    const teamId = (mockBaseItem as Team).id;

    mockFixturesProp.forEach((fixture) => {
      testTextValue(fixture, teamId);
      testContainerBackground(fixture, teamId);
    });
  });
});
