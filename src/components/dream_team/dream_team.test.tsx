import React from "react";
import { render } from "@testing-library/react";
import DreamTeam from "./dream_team";
import { AppDataContext } from "app_content";
import { mockAppData } from "test/fixture_data";

describe("Dream Team Tests", () => {
  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <DreamTeam />
      </AppDataContext.Provider>
    );
  };

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });
});
