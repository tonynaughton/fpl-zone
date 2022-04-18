import React from "react";
import { Container } from "@mui/material";
import { AppLayout } from "components/layout";
import { DetailsForm } from "../components/authentication";

export function AccountPage(): JSX.Element {
  return (
    <AppLayout activeLabel="account" direction="row">
      <Container component="main" maxWidth="sm">
        <DetailsForm registerPage={false} />
      </Container>
    </AppLayout>
  );
}
