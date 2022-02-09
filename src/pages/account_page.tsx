import { Container } from "@mui/material";
import AppLayout from "components/layout/app_layout";
import React from "react";
import DetailsForm from "../components/authentication/details_form";

export default function AccountPage(): JSX.Element {
  return (
    <AppLayout activeLabel="account">
      <Container component="main" maxWidth="sm">
        <DetailsForm registerPage={false} />
      </Container>
    </AppLayout>
  );
}
