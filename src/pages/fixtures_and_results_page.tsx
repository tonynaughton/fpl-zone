import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { auth } from "config/firebase";

import FdrTable from "components/fdr/fdr";
import { AppLayout, ComponentContainer } from "components/layout";
import Results from "components/results/results";

export const FixturesAndResultsPage = (): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  return (
    <AppLayout activeLabel='fixtures & results' direction='row'>
      <Box
        alignItems='center'
        display='flex'
        gap={3}
        justifyContent='center'
        width='100%'
      >
        <Box flexGrow={1} height='100%' >
          <ComponentContainer title='fdr'><FdrTable /></ComponentContainer>
        </Box>
        <Box flexBasis={1} height='100%' >
          <ComponentContainer title='results'><Results /></ComponentContainer>
        </Box>
      </Box>
    </AppLayout>
  );
};
