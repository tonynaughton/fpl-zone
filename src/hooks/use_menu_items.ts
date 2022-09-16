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

  const onMobileItemClick = (href: string): void => {
    closeNavDrawer();
    navigate(href);
  };

  const nav: MenuItemType[] = [
    {
      id: "gw-live",
      label: "gameweek live",
      onClick: () => navigate("/gw-live"),
      subItems: [
        {
          id: "dream-team",
          label: "dream team",
          onClick: () => onMobileItemClick("/gw-live/dream-team")
        },
        {
          id: "summary",
          label: "summary",
          onClick: () => onMobileItemClick("/gw-live/summary")
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
          onClick: () => onMobileItemClick("/my-fpl/my-team")
        },
        {
          id: "my-fdr",
          label: "fdr",
          onClick: () => onMobileItemClick("/my-fpl/my-fdr")
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
          onClick: () => onMobileItemClick("/fix-and-res/fdr")
        },
        {
          id: "results",
          label: "results",
          onClick: () => onMobileItemClick("/fix-and-res/results")
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
          onClick: () => onMobileItemClick("/analysis/comparison")
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
