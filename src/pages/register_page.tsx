import React from "react";

import { AuthLayout, DetailsForm } from "../components/authentication";

export const RegisterPage = (): JSX.Element => {
  return (
    <AuthLayout>
      <DetailsForm registerPage />
    </AuthLayout>
  );
};
