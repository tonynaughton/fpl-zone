import { Container } from "@mui/material";
import AppLayout from "components/layout/app_layout";
import React from "react";
import DetailsForm from "./details_form";

export default function ManageAccount(): JSX.Element {
  return (
    <AppLayout activeLabel="account">
      <Container component="main" maxWidth="sm">
        <DetailsForm />
      </Container>
    </AppLayout>
  );
}
