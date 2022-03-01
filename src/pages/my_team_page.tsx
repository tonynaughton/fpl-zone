import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "config/firebase";
import AppLayout from "components/layout/app_layout";
import { useQuery } from "react-query";
import { getGameData } from "api/fpl_api_provider";
import FdrTable from "components/fdr/fdr";
import { Gameweek, Team } from "types";
import ComponentContainer from "components/layout/component_container";
import { CircularProgress, Typography } from "@mui/material";

export default function MyTeamPage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  let allGameweeks: Gameweek[];
  let currentGameweek: Gameweek | undefined;
  let allTeams: Team[] | undefined;

  const { data, isLoading, error } = useQuery("game-data", getGameData);

  if (data) {
    allGameweeks = data.events;
    allTeams = data.teams;
    currentGameweek = allGameweeks.find((gw) => gw.is_current) as Gameweek;
  }

  const renderFdrTable = (): JSX.Element => {
    if (isLoading) {
      return <CircularProgress />;
    } else if (data && currentGameweek && allTeams) {
      return <FdrTable currentGameweek={currentGameweek} type={allTeams} teams={allTeams} />;
    } else {
      return <Typography>Error getting data!</Typography>;
    }
  };

  return (
    <AppLayout activeLabel="my team">
      <ComponentContainer title="fdr" isLoading={isLoading} error={error}>
        {renderFdrTable()}
      </ComponentContainer>
    </AppLayout>
  );
}
