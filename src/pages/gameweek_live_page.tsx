import React from "react";

import DreamTeam from "components/dream_team/dream_team";
import GameweekSummary from "components/gameweek_summary/gameweek_summary";
import { ComponentContainer,PageLayout } from "components/layout";

export const GameweekLivePage = (): JSX.Element => (
  <PageLayout activeId='gw-live'>
    <ComponentContainer flex={3} title='dream team'><DreamTeam /></ComponentContainer>
    <ComponentContainer title='summary'><GameweekSummary /></ComponentContainer>
  </PageLayout>
);
