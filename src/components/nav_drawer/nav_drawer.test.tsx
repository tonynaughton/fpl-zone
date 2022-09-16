import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { User } from "firebase/auth";
import { MockProviders, mockTheme } from "test/mock_providers";

import "@testing-library/jest-dom";

import NavDrawer from "./nav_drawer";

let mockUser: User | undefined;

jest.mock("react-firebase-hooks/auth", (): Record<string, () => (User | undefined)[]> => (
  { useAuthState: () => [mockUser] }
));

describe("Nav Drawer Tests", () => {
  const mockActiveId = "gw-live";
  const mockQueryClient = new QueryClient();
  const mockCloseNavDrawer = jest.fn();
  let mockIsNavDrawerOpen: boolean;
  const mockNavDrawerWidth = "20%";

  const createComponent = (): JSX.Element => {
    return (
      <QueryClientProvider client={mockQueryClient}>
        <Router>
          <MockProviders>
            <NavDrawer
              activeId={mockActiveId}
              closeNavDrawer={mockCloseNavDrawer}
              isNavDrawerOpen={mockIsNavDrawerOpen}
              navDrawerWidth={mockNavDrawerWidth}
            />
          </MockProviders>
        </Router>
      </QueryClientProvider>
    );
  };

  it("Nav menu items displayed correctly", async () => {
    render(createComponent());

    await screen.findByTestId("nav-drawer");

    expect(screen.getByTestId("menu-item-button-gw-live")).toHaveTextContent("GAMEWEEK LIVE");
    expect(screen.getByTestId("menu-item-text-gw-live")).toHaveStyle("color: black");

    expect(screen.getByTestId("menu-item-button-my-fpl")).toHaveTextContent("MY FPL");
    expect(screen.getByTestId("menu-item-text-my-fpl")).toHaveStyle(`color: ${mockTheme.palette.info.main}`);

    expect(screen.getByTestId("menu-item-button-fix-and-res")).toHaveTextContent("FIXTURES & RESULTS");
    expect(screen.getByTestId("menu-item-text-fix-and-res")).toHaveStyle(`color: ${mockTheme.palette.info.main}`);

    expect(screen.getByTestId("menu-item-button-analysis")).toHaveTextContent("ANALYSIS");
    expect(screen.getByTestId("menu-item-text-analysis")).toHaveStyle(`color: ${mockTheme.palette.info.main}`);
  });

  describe("Auth menu items", () => {
    it("\"Logout\" and \"Account\" displayed when user is logged in", async () => {
      mockUser = {} as User;
      render(createComponent());

      await screen.findByTestId("nav-drawer");

      expect(screen.getByTestId("menu-item-button-logout")).toHaveTextContent("LOGOUT");
      expect(screen.getByTestId("menu-item-text-account")).toHaveTextContent("ACCOUNT");

      expect(screen.queryByTestId("menu-item-text-login")).toBeNull();
      expect(screen.queryByTestId("menu-item-text-register")).toBeNull();

    });

    it("\"Login\" and \"Register\" displayed when user is logged out", async () => {
      mockUser = undefined;
      render(createComponent());

      await screen.findByTestId("nav-drawer");

      expect(screen.getByTestId("menu-item-text-login")).toHaveTextContent("LOGIN");
      expect(screen.getByTestId("menu-item-text-register")).toHaveTextContent("REGISTER");

      expect(screen.queryByTestId("menu-item-text-logout")).toBeNull();
      expect(screen.queryByTestId("menu-item-text-account")).toBeNull();
    });
  });
});
