import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import FdrTable from "components/fdr/fdr";
import { AppLayout, ComponentContainer } from "components/layout";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Results from "components/results/results";

export function FixturesAndResultsPage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  return (
    <AppLayout activeLabel="fixtures & results" direction="row">
      <Grid container columnSpacing={4}>
        <Grid item xs={8}>
          <ComponentContainer title="fdr">
            <FdrTable />
          </ComponentContainer>
        </Grid>
        <Grid item xs={4}>
          <ComponentContainer title="results">
            <Results />
          </ComponentContainer>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
