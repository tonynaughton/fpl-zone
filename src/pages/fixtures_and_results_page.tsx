import React from "react";

import FdrTable from "components/fdr/fdr";
import { ComponentContainer,PageLayout } from "components/layout";
import Results from "components/results/results";

export const FixturesAndResultsPage = (): JSX.Element => (
  <PageLayout activeId='fix-and-res'>
    <ComponentContainer flex={2} title='fdr'><FdrTable /></ComponentContainer>
    <ComponentContainer title='results'><Results /></ComponentContainer>
  </PageLayout>
);
