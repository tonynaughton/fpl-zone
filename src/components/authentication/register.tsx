import React from "react";
import AuthLayout from "./auth_layout";
import DetailsForm from "./details_form";

export default function Register(): JSX.Element {
  return (
    <AuthLayout>
      <DetailsForm />
    </AuthLayout>
  );
}
