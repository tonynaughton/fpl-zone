import React from "react";
import { render, screen, within } from "@testing-library/react";
import { AppDataContext } from "app_content";
import { getLocalImage } from "helpers";
import { mockAppData, mockPlayers, mockTeams } from "test/test_data";

import { BaseItem } from "components/fdr/fdr";

import "@testing-library/jest-dom/extend-expect";

import { BaseItemName } from "./base_item_name";

describe("Base Item Name Tests", () => {
  let mockBaseItem: BaseItem;
  const mockPlayer = mockPlayers[0];
  const mockTeam = mockTeams[0];

  const createComponent = (): JSX.Element => {
    return (
      <AppDataContext.Provider value={mockAppData}>
        <BaseItemName baseItem={mockBaseItem} />
      </AppDataContext.Provider>
    );
  };

  describe("Player displays correctly", () => {
    mockBaseItem = mockPlayer;

    render(createComponent());
    const container = within(screen.getByTestId(`base-item-${mockPlayer.id}`));

    it("name", () => {
      const text = container.getByTestId(`base-item-text-${mockPlayer.id}`);

      expect(text).toHaveTextContent(mockPlayer.web_name.toUpperCase());
    });

    it("image", () => {
      const img = container.getByTestId(`base-item-crest-img-${mockPlayer.id}`);
      const imgUrl = getLocalImage(`crests/${mockPlayer.team_code}.png`);

      expect(img).toHaveAttribute("src", imgUrl);
    });
  });

  describe("Team displays correctly", () => {
    mockBaseItem = mockTeam;

    render(createComponent());
    const container = within(screen.getByTestId(`base-item-${mockTeam.id}`));

    it("name", () => {
      const text = container.getByTestId(`base-item-text-${mockTeam.id}`);

      expect(text).toHaveTextContent(mockTeam.name.toUpperCase());
    });

    it("image", () => {
      const img = container.getByTestId(`base-item-crest-img-${mockTeam.id}`);
      const imgUrl = getLocalImage(`crests/${mockTeam.code}.png`);

      expect(img).toHaveAttribute("src", imgUrl);
    });
  });
});
