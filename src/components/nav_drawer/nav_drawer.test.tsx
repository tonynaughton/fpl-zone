import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { User } from "firebase/auth";
import { MockProviders, mockTheme } from "test/mock_providers";

import "@testing-library/jest-dom";

import NavDrawer, { menuItems } from "./nav_drawer";

let mockUser: User | undefined;

jest.mock("react-firebase-hooks/auth", (): Record<string, () => (User | undefined)[]> => (
  { useAuthState: () => [mockUser] }
));

describe("Nav Drawer Tests", () => {
  const mockActiveId = "gw-live";

  const mockQueryClient = new QueryClient();

  const createComponent = (): JSX.Element => {
    return (
      <QueryClientProvider client={mockQueryClient}>
        <Router>
          <MockProviders>
            <NavDrawer activeId={mockActiveId} />
          </MockProviders>
        </Router>
      </QueryClientProvider>
    );
  };

  describe("Nav items", () => {
    it("Labels displayed as expected", async () => {
      render(createComponent());

      await screen.findByTestId("nav-drawer");

      menuItems.nav.forEach(item => {
        const text = screen.getByTestId(`menu-item-text-${item.id}`);
        expect(text).toHaveTextContent(item.label.toUpperCase());

        const expectedColor = item.id === mockActiveId ? "black" : mockTheme.palette.info.main;
        expect(text).toHaveStyle(`color: ${expectedColor}`);
      });
    });

    it("Active item has expected styling", async () => {
      render(createComponent());

      await screen.findByTestId("nav-drawer");

      menuItems.nav.forEach(item => {
        const text = screen.getByTestId(`menu-item-text-${item.id}`);

        const expectedColor = item.id === mockActiveId ? "black" : mockTheme.palette.info.main;
        expect(text).toHaveStyle(`color: ${expectedColor}`);
      });
    });
  });

  describe("Auth items", () => {
    it("Logged in items displayed as expected", async () => {
      mockUser = {} as User;

      render(createComponent());

      await screen.findByTestId("nav-drawer");

      const logoutText = screen.getByTestId("menu-item-text-logout");
      expect(logoutText).toHaveTextContent("LOGOUT");

      const accountText = screen.getByTestId("menu-item-text-account");
      expect(accountText).toHaveTextContent("ACCOUNT");

      expect(screen.queryByTestId("menu-item-text-login")).toBeNull();
      expect(screen.queryByTestId("menu-item-text-register")).toBeNull();
    });

    it("Logged out items displayed as expected", async () => {
      mockUser = undefined;

      render(createComponent());

      await screen.findByTestId("nav-drawer");

      const logoutText = screen.getByTestId("menu-item-text-login");
      expect(logoutText).toHaveTextContent("LOGIN");

      const accountText = screen.getByTestId("menu-item-text-register");
      expect(accountText).toHaveTextContent("REGISTER");

      expect(screen.queryByTestId("menu-item-text-logout")).toBeNull();
      expect(screen.queryByTestId("menu-item-text-account")).toBeNull();
    });
  });
});
