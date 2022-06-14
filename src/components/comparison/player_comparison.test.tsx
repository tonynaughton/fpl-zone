import React from "react";
import { render } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData } from "test/test_data";

import "@testing-library/jest-dom/extend-expect";

import { PlayerComparison } from ".";

describe("Player comparison tests", () => {
  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <PlayerComparison />
      </AppDataContext.Provider>
    );
  };

  it("Snapshot test", () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });
});
