import React from "react";
import { Box } from "@mui/material";

import FdrTable from "components/fdr/fdr";
import { AppLayout, ComponentContainer } from "components/layout";
import Results from "components/results/results";

export const FixturesAndResultsPage = (): JSX.Element => {
  return (
    <AppLayout active='fixtures & results'>
      <Box className='flex-center' gap={3} width='100%'>
        <Box flexBasis='60%' height='100%' minWidth={0}>
          <ComponentContainer title='fdr'><FdrTable /></ComponentContainer>
        </Box>
        <Box flexBasis='40%' height='100%' minWidth={0}>
          <ComponentContainer title='results'><Results /></ComponentContainer>
        </Box>
      </Box>
    </AppLayout>
  );
};
