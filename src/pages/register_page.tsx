import React from "react";

import { AuthLayout, DetailsForm } from "../components/authentication";

export function RegisterPage(): JSX.Element {
  return (
    <AuthLayout>
      <DetailsForm registerPage={true} />
    </AuthLayout>
  );
}
