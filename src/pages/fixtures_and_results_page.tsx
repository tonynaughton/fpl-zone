import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { getGameData } from "api/fpl_api_provider";
import FdrTable from "components/fdr/fdr";
import AppLayout from "components/layout/app_layout";
import ComponentContainer from "components/layout/component_container";
import Error from "components/layout/error";
import Loading from "components/layout/loading";
import { auth } from "config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Gameweek } from "types";

export default function FixturesAndResultsPage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const { data: gameData, isLoading, error } = useQuery("game-data", getGameData);

  const allTeams = gameData?.teams;
  const currentGameweek = gameData?.events.find((gw) => gw.is_current) as Gameweek;

  const renderFdrTable = (): JSX.Element => {
    if (!!gameData && !!currentGameweek && !!allTeams) {
      return <FdrTable currentGameweek={currentGameweek} type={allTeams} teams={allTeams} />;
    } else if (isLoading) {
      return <Loading message="Fetching game data.." />;
    } else {
      return <Error message="Error getting data!" />;
    }
  };

  return (
    <AppLayout activeLabel="fixtures & results" direction="row">
      <Box sx={{ height: "auto" }}>
        <ComponentContainer isLoading={isLoading} error={error} title="fdr">
          {renderFdrTable()}
        </ComponentContainer>
      </Box>
      <Box sx={{ flexGrow: "1", height: "100%" }}>
        <ComponentContainer isLoading={isLoading} error={error} title="results">
          {renderFdrTable()}
        </ComponentContainer>
      </Box>
    </AppLayout>
  );
}
