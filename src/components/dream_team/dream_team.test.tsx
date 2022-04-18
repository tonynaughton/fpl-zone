import React from "react";
import { render } from "@testing-library/react";
import DreamTeam from "./dream_team";
import { AppDataContext } from "app_content";
import { mockElementStats, mockPlayers } from "test/fixture-data";
import { GameData } from "types";

describe("Dream Team Tests", () => {
  const appData = {
    gameData: {
      element_types: mockElementStats,
      elements: mockPlayers,
      
    } as GameData
  }

  const createComponent = (): JSX.Element => {
    return (<AppDataContext.Provider value={appData}><DreamTeam /></AppDataContext.Provider>);
  };

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });
});
