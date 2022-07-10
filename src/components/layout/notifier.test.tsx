import React from "react";
import { render, screen } from "@testing-library/react";
import { MockProviders } from "test/mock_providers";

import "@testing-library/jest-dom/extend-expect";

import { Notifier, NotifierType } from "./notifier";

describe("Notifier tests", () => {
  let mockType: NotifierType | undefined;
  let mockMessage: string | undefined;

  const createComponent = (): JSX.Element => {
    return (
      <MockProviders>
        <Notifier
          message={mockMessage}
          type={mockType}
        />
      </MockProviders>
    );
  };

  describe("Message", () => {
    it("displays expected text if prop is defined", () => {
      mockMessage = "This is a mock message..";

      render(createComponent());

      expect(screen.getByTestId("notifier")).toHaveTextContent(mockMessage);
    });

    it("displays default text if prop is not defined", () => {
      mockMessage = undefined;

      render(createComponent());

      expect(screen.getByTestId("notifier")).toHaveTextContent("Loading...");
    });
  });

  describe("Type", () => {
    it("error", () => {
      mockType = "error";

      render(createComponent());

      expect(screen.getByTestId("error-icon")).toBeInTheDocument();
    });

    it("warning", () => {
      mockType = "warning";

      render(createComponent());

      expect(screen.getByTestId("warning-icon")).toBeInTheDocument();
    });

    it("loading", () => {
      mockType = "loading";

      render(createComponent());

      expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
    });
  });
});
