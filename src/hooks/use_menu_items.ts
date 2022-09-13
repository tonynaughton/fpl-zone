import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "app_content";
import { logout } from "config";

import { AuthModalContext, AuthModalView } from "components/layout";
import { MenuItemType } from "components/nav_drawer/menu_list";

interface MenuItems {
  nav: MenuItemType[];
  auth: MenuItemType[];
}

export const useMenuItems = (closeNavDrawer: () => void): MenuItems => {
  const { fplId, setFplId, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setAuthModalView } = useContext(AuthModalContext);

  const onLogoutClick = (): void => {
    fplId ? setFplId() : logout();
  };

  const onAuthItemClick = (view: AuthModalView): void => {
    closeNavDrawer();
    setAuthModalView(view);
  };

  const nav: MenuItemType[] = [
    {
      id: "gw-live",
      label: "gameweek live",
      onClick: () => navigate("/gameweek-live"),
      subItems: [
        {
          id: "dream-team",
          label: "dream team",
          onClick: () => navigate("dream-team")
        },
        {
          id: "summary",
          label: "summary",
          onClick: () => navigate("summary")
        }
      ]
    },
    {
      id: "my-fpl",
      label: "my fpl",
      onClick: () => navigate("/my-fpl"),
      subItems: [
        {
          id: "my-team",
          label: "my team",
          onClick: () => navigate("my-team")
        },
        {
          id: "my-fpl-fdr",
          label: "fdr",
          onClick: () => navigate("my-fpl-fdr")
        }
      ]
    },
    {
      id: "fix-and-res",
      label: "fixtures & results",
      onClick: () => navigate("/fix-and-res"),
      subItems: [
        {
          id: "fix-and-res-fdr",
          label: "fdr",
          onClick: () => navigate("fix-and-res-fdr")
        },
        {
          id: "results",
          label: "results",
          onClick: () => navigate("results")
        }
      ]
    },
    {
      id: "analysis",
      label: "analysis",
      onClick: () => navigate("/analysis"),
      subItems: [
        {
          id: "comparison",
          label: "comparison",
          onClick: () => navigate("comparison")
        }
      ]
    }
  ];

  const auth: MenuItemType[] = [
    ...user || fplId
      ? [
        {
          id: "logout",
          label: "logout",
          onClick: onLogoutClick
        },
        ...user
          ? [
            {
              id: "account",
              label: "account",
              onClick: () => onAuthItemClick("account")
            }
          ]
          : []
      ]
      : [
        {
          id: "login",
          label: "login",
          onClick: () => onAuthItemClick("login")
        },
        {
          id: "register",
          label: "register",
          onClick: () => onAuthItemClick("register")
        }
      ]
  ];

  return { nav, auth };
};
