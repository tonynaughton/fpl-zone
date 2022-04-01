import React from "react";
import { render } from "@testing-library/react";
import DreamTeam from "../components/dream_team/dream_team";
import { mockElementStats, mockPlayers, mockPositions, mockTeams } from "./fixture-data";

describe("Dream Team Tests", () => {
  const createComponent = (): JSX.Element => {
    return (
      <DreamTeam
        players={mockPlayers}
        positions={mockPositions}
        elementStats={mockElementStats}
        teams={mockTeams}
      />
    );
  };

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });
});
