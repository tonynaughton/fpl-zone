import React, { useContext, useEffect, useState } from "react";

import { AuthModalContext } from "components/layout";
import { CustomModal } from "components/utils";

import { AccountForm } from "./account/account_form";
import { FplIdloginForm } from "./login/fpl_id_login_form";
import { LoginForm } from "./login/login_form";
import { RegisterForm } from "./register/register_form";
import { ResetForm } from "./reset/reset_form";

export const AuthModal = (): JSX.Element => {
  const { authModalView, setAuthModalView } = useContext(AuthModalContext);

  const [authModalTitle, setAuthModalTitle] = useState<string>("");
  const [authModalContent, setAuthModalContent] = useState<JSX.Element>(<></>);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const closeAuthModal = (): void => setAuthModalView("none");

  useEffect(() => {
    switch (authModalView) {
    case "none":
      setIsAuthModalOpen(false);
      setAuthModalTitle("");
      setAuthModalContent(<></>);
      break;
    case "login":
      setAuthModalTitle("Login");
      setAuthModalContent(<LoginForm />);
      setIsAuthModalOpen(true);
      break;
    case "register":
      setAuthModalTitle("Register");
      setAuthModalContent(<RegisterForm />);
      setIsAuthModalOpen(true);
      break;
    case "account":
      setAuthModalTitle("Account");
      setAuthModalContent(<AccountForm />);
      setIsAuthModalOpen(true);
      break;
    case "reset":
      setAuthModalTitle("Reset password");
      setAuthModalContent(<ResetForm />);
      setIsAuthModalOpen(true);
      break;
    case "fplIdLogin":
      setAuthModalTitle("FPL ID Login");
      setAuthModalContent(<FplIdloginForm />);
      setIsAuthModalOpen(true);
      break;
    default:
      setAuthModalTitle("Login");
      setAuthModalContent(<LoginForm />);
      setIsAuthModalOpen(true);
      break;
    };
  }, [authModalView]);

  return (
    <CustomModal
      closeModal={closeAuthModal}
      compact
      isModalOpen={isAuthModalOpen}
      title={authModalTitle}
    >
      {authModalContent}
    </CustomModal>
  );
};
