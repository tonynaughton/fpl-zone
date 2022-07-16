import React, { useState } from "react";
import { Box } from "@mui/material";

import { AuthModal } from "components/authentication/auth_modal";
import NavDrawer from "components/nav_drawer/nav_drawer";

interface LayoutProps {
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

export const AppLayout = ({ activeId, children }: React.PropsWithChildren<LayoutProps>): JSX.Element => {
  const [authModalView, setAuthModalView] = useState<AuthModalView>("none");
  const authModalContextValue = { authModalView, setAuthModalView };

  return (
    <>
      <Box component='div' display='flex'>
        <AuthModalContext.Provider value={authModalContextValue}>
          <NavDrawer activeId={activeId} />
        </AuthModalContext.Provider>
        <Box
          component='main'
          display='flex'
          flexGrow={1}
          gap={3}
          height='100vh'
          justifyContent='center'
          padding={3}
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
