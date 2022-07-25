import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

import { APP_BAR_HEIGHT, CustomAppBar } from "components/app_bar/app_bar";
import { AuthModal } from "components/authentication/auth_modal";
import NavDrawer from "components/nav_drawer/nav_drawer";

interface PageLayoutProps {
  activeId: string;
}

export type AuthModalView =
  "login" |
  "register" |
  "account" |
  "reset" |
  "fplIdLogin" |
  "logout" |
  "none";

interface AuthModalContextType {
  authModalView: AuthModalView;
  setAuthModalView: (value: AuthModalView) => void;
}

export const AuthModalContext = React.createContext<AuthModalContextType>({
  authModalView: "none",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthModalView: () => {}
});

export const PageLayout = ({ activeId, children }: React.PropsWithChildren<PageLayoutProps>): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [authModalView, setAuthModalView] = useState<AuthModalView>("none");
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);
  const authModalContextValue = { authModalView, setAuthModalView };

  const closeNavDrawer = (): void => setIsNavDrawerOpen(false);
  const openNavDrawer = (): void => setIsNavDrawerOpen(true);

  return (
    <>
      <Box component='div' display='flex'>
        <AuthModalContext.Provider value={authModalContextValue}>
          <CustomAppBar openNavDrawer={openNavDrawer} />
          <NavDrawer activeId={activeId} closeNavDrawer={closeNavDrawer} isNavDrawerOpen={isNavDrawerOpen} />
        </AuthModalContext.Provider>
        <Box
          component='main'
          display='flex'
          flexDirection={isMobile ? "column" : "row"}
          gap={3}
          height='100vh'
          mt={isMobile ? APP_BAR_HEIGHT : 0}
          padding={isMobile ? 1.5 : 3}
          width='100%'
        >
          {children}
        </Box>
      </Box>
      <AuthModalContext.Provider value={authModalContextValue}>
        <AuthModal />
      </AuthModalContext.Provider>
    </>
  );
};
