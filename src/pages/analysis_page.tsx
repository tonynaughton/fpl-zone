/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "config/firebase";

import { PlayerComparison } from "components/comparison";
import { AppLayout, ComponentContainer } from "components/layout";

export const AnalysisPage = (): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  return (
    <AppLayout activeLabel='analysis' direction='row'>
      <ComponentContainer title='comparison'><PlayerComparison /></ComponentContainer>
    </AppLayout>
  );
};
