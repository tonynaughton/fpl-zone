import React from "react";
import { Box } from "@mui/material";

import DreamTeam from "components/dream_team/dream_team";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { AppLayout, ComponentContainer } from "components/layout";

export const GameweekLivePage = (): JSX.Element => (
  <AppLayout activeId='gw-live'>
    <Box
      className='flex-center'
      gap={3}
      minWidth={0}
      width='100%'
    >
      <Box flexBasis='70%' height='100%' minWidth={0}>
        <ComponentContainer title='dream team'><DreamTeam /></ComponentContainer>
      </Box>
      <Box flexBasis='30%' height='100%' minWidth={0}>
        <ComponentContainer title='summary'><GameweekSummary /></ComponentContainer>
      </Box>
    </Box>
  </AppLayout>
);
