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
      <Box className='flex-center' gap={3} width='100%'>
        <Box flexBasis='65%' height='100%' minWidth={0}>
          <ComponentContainer title='fdr'><FdrTable /></ComponentContainer>
        </Box>
        <Box flexBasis='35%' height='100%' minWidth={0}>
          <ComponentContainer title='results'><Results /></ComponentContainer>
        </Box>
      </Box>
    </AppLayout>
  );
};
