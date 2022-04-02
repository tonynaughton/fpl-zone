import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, getUserFplTeamId } from "config/firebase";
import AppLayout from "components/layout/app_layout";
import { useQuery } from "react-query";
import { getGameData, getTeamData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import FdrTable from "components/fdr/fdr";
import { Gameweek, Player, TeamData, TeamPicks } from "types";
import ComponentContainer from "components/layout/component_container";
import { Box, Typography } from "@mui/material";
import Loading from "components/layout/loading";
import { GetPlayerById } from "helpers";
import Lineup from "components/lineup/lineup";
import Error from "components/layout/error";
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
  const elementStats = gameData?.element_stats;

  const { data: teamPicks } = useQuery(
    [fplId, currentGameweek],
    async () => {
      const response = await getTeamPicksForGameweek(fplId, currentGameweek.id);
      return response;
    },
    { enabled: !!(currentGameweek && fplId) }
  );

  const { data: teamData } = useQuery(
    [fplId],
    async () => {
      const response = await getTeamData(fplId);
      return response;
    },
    { enabled: !!fplId }
  );

  const playersFromTeamPicks =
    gameData &&
    teamPicks &&
    _(teamPicks.picks)
      .map((pick) => GetPlayerById(pick.element, gameData.elements))
      .sortBy("element_type")
      .value();

  const getSelectedPlayers = (): Player[][] => {
    const selectedByPos: Player[][] = [];
    const firstXIPicks = _.slice(teamPicks?.picks, 0, 11);
    gameData?.element_types.forEach((pos) => {
      const picks = firstXIPicks.filter((pick) => {
        const player = GetPlayerById(pick.element, gameData.elements);
        return player.element_type === pos.id;
      });
      const players = picks.map((pick) => GetPlayerById(pick.element, gameData.elements));
      selectedByPos.push(players);
    });
    return selectedByPos;
  };

  const getBenchPlayers = (): Player[] => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const benchPlayersPicks = teamPicks!.picks.slice(11, 15);
    const benchPlayers = benchPlayersPicks.map((pick) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      GetPlayerById(pick.element, gameData!.elements)
    );
    return benchPlayers;
  };

  const EnterFPLID = (): JSX.Element => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
        Please add your FPL ID in&nbsp;
        <Link to="/account" style={{ textDecoration: "none", color: "#16B7EA" }}>
          Account
        </Link>
      </Box>
    );
  };

  const renderTeamComponent = (): JSX.Element => {
    if (!fplId) {
      return <EnterFPLID />;
    } else if (
      !!gameData &&
      !!currentGameweek &&
      !!allTeams &&
      !!playersFromTeamPicks &&
      !!teamPicks &&
      !!elementStats
    ) {
      return (
        <Lineup
          selected={getSelectedPlayers()}
          bench={getBenchPlayers()}
          teamPicks={teamPicks as TeamPicks}
          teamData={teamData as TeamData}
          elementStats={elementStats}
          compressed
          teams={allTeams}
        />
      );
    } else if (isLoading) {
      return <Loading message="Fetching game data.." />;
    } else {
      return <Error message="Error getting data!" />;
    }
  };

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
    } else if (!!gameData && !!currentGameweek && !!allTeams && !!playersFromTeamPicks) {
      return (
        <FdrTable currentGameweek={currentGameweek} type={playersFromTeamPicks} teams={allTeams} />
      );
    } else if (isLoading) {
      return <Loading message="Fetching game data.." />;
    } else {
      return <Typography>Error getting data!</Typography>;
    }
  };

  return (
    <AppLayout activeLabel="my team" direction="row">
      <ComponentContainer title="team" isLoading={isLoading} error={error}>
        {renderTeamComponent()}
      </ComponentContainer>
      <ComponentContainer title="fdr" isLoading={isLoading} error={error}>
        {renderFdrTable()}
      </ComponentContainer>
    </AppLayout>
  );
}
