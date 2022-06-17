import React from "react";
import { render, screen } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData } from "test";

import "@testing-library/jest-dom/extend-expect";

import { Armband } from "./armband";

describe("Armband tests", () => {
  const createComponent = (isVice: boolean): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <Armband isVice={isVice} />
      </AppDataContext.Provider>
    );
  };

  describe("Text content displays as expected", () => {
    it("when captain", () => {
      render(createComponent(false));

      const container = screen.getByTestId("armband-container");

      expect(container).toHaveTextContent("C");
      expect(container).not.toHaveTextContent("V");
    });

    it("when vice captain", () => {
      render(createComponent(true));

      const container = screen.getByTestId("armband-container");

      expect(container).toHaveTextContent("V");
      expect(container).not.toHaveTextContent("C");
    });
  });
});
