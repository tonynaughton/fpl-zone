import React from "react";

import { PlayerComparison } from "components/comparison";
import { ComponentContainer,PageLayout } from "components/layout";

export const AnalysisPage = (): JSX.Element => {
  return (
    <PageLayout activeId='analysis'>
      <ComponentContainer title='comparison'>
        <PlayerComparison />
      </ComponentContainer>
    </PageLayout>
  );
};
