import React, { useContext, useEffect, useState } from "react";
import { FplIdContext } from "app_content";
import { logout } from "config";

import { AuthModalContext } from "components/layout";
import { CustomModal } from "components/utils";

import { AccountForm } from "./account/account_form";
import { FplIdloginForm } from "./login/fpl_id_login_form";
import { LoginForm } from "./login/login_form";
import { RegisterForm } from "./register/register_form";
import { ResetForm } from "./reset/reset_form";

export type AuthModalView =
  "login" |
  "register" |
  "account" |
  "reset" |
  "fplIdLogin" |
  "logout" |
  "none";

export const AuthModal = (): JSX.Element => {
  const { authModalView } = useContext(AuthModalContext);
  const { fplId, setFplId } = useContext(FplIdContext);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalContent, setAuthModalContent] = useState<JSX.Element>(<></>);
  const [authModalTitle, setAuthModalTitle] = useState<string>("");

  useEffect(() => {
    switch (authModalView) {
    case "none":
      setIsAuthModalOpen(false);
      setAuthModalTitle("");
      setAuthModalContent(<></>);
      break;
    case "login":
      setIsAuthModalOpen(true);
      setAuthModalTitle("Login");
      setAuthModalContent(<LoginForm />);
      break;
    case "register":
      setIsAuthModalOpen(true);
      setAuthModalTitle("Register");
      setAuthModalContent(<RegisterForm />);
      break;
    case "account":
      setIsAuthModalOpen(true);
      setAuthModalTitle("Account");
      setAuthModalContent(<AccountForm />);
      break;
    case "reset":
      setIsAuthModalOpen(true);
      setAuthModalTitle("Reset password");
      setAuthModalContent(<ResetForm />);
      break;
    case "fplIdLogin":
      setIsAuthModalOpen(true);
      setAuthModalTitle("FPL ID Login");
      setAuthModalContent(<FplIdloginForm />);
      break;
    case "logout":
      fplId ? setFplId() : logout();
      break;
    default:
      setIsAuthModalOpen(true);
      setAuthModalTitle("Login");
      setAuthModalContent(<LoginForm />);
      break;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authModalView]);

  return (
    <CustomModal
      compact
      isModalOpen={isAuthModalOpen}
      setModalOpen={setIsAuthModalOpen}
      title={authModalTitle}
    >
      {authModalContent}
    </CustomModal>
  );
};
