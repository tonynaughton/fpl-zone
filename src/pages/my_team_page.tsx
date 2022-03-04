import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, getUserFplTeamId } from "config/firebase";
import AppLayout from "components/layout/app_layout";
import { useQuery } from "react-query";
import { getGameData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import FdrTable from "components/fdr/fdr";
import { Gameweek } from "types";
import ComponentContainer from "components/layout/component_container";
import { Box, Typography } from "@mui/material";
import Loading from "components/layout/loading";
import { GetPlayerById } from "helpers";
import _ from "lodash";

export default function MyTeamPage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const { data: fplId } = useQuery([user?.uid], getUserFplTeamId);
  const { data: gameData, isLoading, error } = useQuery("game-data", getGameData);

  const allTeams = gameData?.teams;
  const currentGameweek = gameData?.events.find((gw) => gw.is_current) as Gameweek;

  const { data: teamData } = useQuery(
    [fplId, currentGameweek],
    async () => {
      const response = await getTeamPicksForGameweek(fplId, currentGameweek.id);
      return response;
    },
    { enabled: !!(currentGameweek && fplId) }
  );

  const playersFromTeamData =
    gameData &&
    teamData &&
    _(teamData.picks)
      .map((pick) => GetPlayerById(pick.element, gameData.elements))
      .sortBy("element_type")
      .value();

  const renderFdrTable = (): JSX.Element => {
    if (!fplId) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
          Please add your FPL ID in&nbsp;
          <Link to="/account" style={{ textDecoration: "none", color: "#16B7EA" }}>
            Account
          </Link>
        </Box>
      );
    } else if (!!gameData && !!currentGameweek && !!allTeams && !!playersFromTeamData) {
      return (
        <FdrTable currentGameweek={currentGameweek} type={playersFromTeamData} teams={allTeams} />
      );
    } else if (isLoading) {
      return <Loading message="Fetching game data.." />;
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
