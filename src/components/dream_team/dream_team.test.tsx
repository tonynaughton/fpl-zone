import React from "react";
import { render } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { mockAppData } from "test/test_data";

import DreamTeam from "./dream_team";

describe("Dream Team Tests", () => {
  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <DreamTeam />
      </AppDataContext.Provider>
    );
  };


});
