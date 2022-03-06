import ReactHookFormTest from "components/authentication/react-hook-form-test";
import React from "react";
import AuthLayout from "../components/authentication/auth_layout";
import DetailsForm from "../components/authentication/details_form";

export default function RegisterPage(): JSX.Element {
  return (
    <AuthLayout>
      <ReactHookFormTest registerPage={true} />
    </AuthLayout>
  );
}
