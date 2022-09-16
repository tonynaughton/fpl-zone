import React from "react";

import { ComponentContainer,PageLayout } from "components/layout";
import { MyFdr } from "components/my_fdr/my_fdr";
import { MyTeam } from "components/my_team/my_team";

export const MyFPLPage = (): JSX.Element => (
  <PageLayout activeId='my-fpl'>
    <ComponentContainer title='my team'><MyTeam /></ComponentContainer>
    <ComponentContainer title='fdr'><MyFdr /></ComponentContainer>
  </PageLayout>
);
