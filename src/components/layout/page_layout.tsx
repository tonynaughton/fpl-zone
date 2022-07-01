import React, { useState } from "react";
import { Box } from "@mui/material";

import { AccountForm, FplIdloginForm, LoginForm, RegisterForm, ResetForm } from "components/authentication";
import NavDrawer from "components/nav_drawer/nav_drawer";
import { CustomModal } from "components/utils";

interface LayoutProps {
  active: string;
}

export enum AuthModalView {
  Login,
  Register,
  Account,
  Reset,
  FplIdLogin
};

export const AppLayout = ({ active, children }: React.PropsWithChildren<LayoutProps>): JSX.Element => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalContent, setAuthModalContent] = useState<JSX.Element>(<></>);
  const [authModalTitle, setAuthModalTitle] = useState<string>("");

  const closeAuthModal = (): void => {
    setIsAuthModalOpen(false);
    setAuthModalContent(<></>);
  };

  const openAuthModal = (view: AuthModalView): void => {
    setIsAuthModalOpen(true);

    switch (view) {
    case AuthModalView.Login:
      setAuthModalTitle("Login");
      setAuthModalContent(<LoginForm closeAuthModal={closeAuthModal} openAuthModal={openAuthModal} />);
      break;
    case AuthModalView.Register:
      setAuthModalTitle("Register");
      setAuthModalContent(<RegisterForm closeAuthModal={closeAuthModal} openAuthModal={openAuthModal} />);
      break;
    case AuthModalView.Account:
      setAuthModalTitle("Account");
      setAuthModalContent(<AccountForm closeAuthModal={closeAuthModal} />);
      break;
    case AuthModalView.Reset:
      setAuthModalTitle("Reset password");
      setAuthModalContent(<ResetForm openAuthModal={openAuthModal} />);
      break;
    case AuthModalView.FplIdLogin:
      setAuthModalTitle("FPL ID Login");
      setAuthModalContent(<FplIdloginForm closeAuthModal={closeAuthModal} openAuthModal={openAuthModal} />);
      break;
    default:
      setAuthModalTitle("Login");
      setAuthModalContent(<LoginForm closeAuthModal={closeAuthModal} openAuthModal={openAuthModal} />);
      break;
    };
  };

  return (
    <>
      <Box component='div' display='flex'>
        <NavDrawer active={active} openAuthModal={openAuthModal} />
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
      <CustomModal
        compact
        isModalOpen={isAuthModalOpen}
        setModalOpen={setIsAuthModalOpen}
        title={authModalTitle}
      >
        {authModalContent}
      </CustomModal>
    </>
  );
};
