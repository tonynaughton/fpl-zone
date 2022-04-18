import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, getUserFplTeamId } from "config/firebase";
import { useQuery } from "react-query";
import { getTeamData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import FdrTable from "components/fdr/fdr";
import { Gameweek, Player, TeamData, TeamPicks, AppData } from "types";
import { Box } from "@mui/material";
import { checkGameUpdatingStatus, GetPlayerById } from "helpers";
import Lineup from "components/lineup/lineup";
import _ from "lodash";
import { ErrorMessage, AppLayout, ComponentContainer, LoadingMessage } from "components/layout";
import { AppDataContext } from "app_content";

export function MyTeamPage(): JSX.Element {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const appData = useContext(AppDataContext) as AppData;
  const currentGameweek = appData.gameData.events.find((gw) => gw.is_current) as Gameweek;

  // Fetching users stored FPL ID (if exists)
  const {
    data: fplId,
    isLoading: fplIdFetchIsLoading,
    error: fplIdFetchError,
  } = useQuery([user?.uid], getUserFplTeamId);

  // Fetching users FPL team data
  const {
    data: teamData,
    error: teamDataFetchError,
    isLoading: teamDataFetchIsLoading,
  } = useQuery([fplId], async () => await getTeamData(fplId), {
    enabled: !!fplId,
  });

  // Fetching users selection picks for current gameweek
  const {
    data: teamPicks,
    error: teamPicksFetchError,
    isLoading: teamPicksFetchIsLoading,
  } = useQuery(
    [fplId, currentGameweek],
    async () => await getTeamPicksForGameweek(fplId, currentGameweek.id),
    { enabled: !!fplId }
  );

  // Component which renders if user has no FPL ID stored
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
    const gameUpdatingStatus = checkGameUpdatingStatus(appData.gameData.events);
    if (!fplId) {
      return <EnterFPLID />;
    } else if (gameUpdatingStatus) {
      return <LoadingMessage message="Game is updating" />;
    } else if (teamPicks && teamData) {
      // Function which returns an array of players divided into sub arrays by position
      const getSelectedPlayers = (): Player[][] => {
        const selectedByPos: Player[][] = [];
        const firstXIPicks = _.slice(teamPicks?.picks, 0, 11);
        appData.gameData.element_types.forEach((pos) => {
          const picks = firstXIPicks.filter((pick) => {
            const player = GetPlayerById(pick.element, appData.gameData.elements);
            return player.element_type === pos.id;
          });
          const players = picks.map((pick) =>
            GetPlayerById(pick.element, appData.gameData.elements)
          );
          selectedByPos.push(players);
        });
        return selectedByPos;
      };

      // Function which returns bench players as array
      const getBenchPlayers = (): Player[] => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const benchPlayersPicks = teamPicks!.picks.slice(11, 15);
        const benchPlayers = benchPlayersPicks.map((pick) =>
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          GetPlayerById(pick.element, appData!.gameData.elements)
        );
        return benchPlayers;
      };

      return (
        <Lineup
          selected={getSelectedPlayers()}
          bench={getBenchPlayers()}
          teamPicks={teamPicks as TeamPicks}
          teamData={teamData as TeamData}
          elementStats={appData.gameData.element_stats}
          compressed
          teams={appData.gameData.teams}
        />
      );
    } else if (fplIdFetchError) {
      return <ErrorMessage message="Error getting FPL ID" />;
    } else if (teamDataFetchError) {
      return <ErrorMessage message="Error getting your team data - is your FPL ID correct?" />;
    } else if (teamPicksFetchError) {
      return <ErrorMessage message="Error getting your team picks - is your FPL ID correct?" />;
    } else {
      return <LoadingMessage message="Fetching data.." />;
    }
  };

  const renderFdrTable = (): JSX.Element => {
    if (!fplId) {
      return <EnterFPLID />;
    } else if (teamPicks) {
      const fdrPlayers =
        teamPicks &&
        _(teamPicks.picks)
          .map((pick) => GetPlayerById(pick.element, appData.gameData.elements))
          .sortBy("element_type")
          .value();
      return (
        <FdrTable
          currentGameweek={currentGameweek}
          type={fdrPlayers}
          teams={appData.gameData.teams}
        />
      );
    } else if (fplIdFetchError) {
      return <ErrorMessage message="Error getting FPL ID" />;
    } else if (teamDataFetchError) {
      return <ErrorMessage message="Error getting your team data - is your FPL ID correct?" />;
    } else if (teamPicksFetchError) {
      return <ErrorMessage message="Error getting your team picks - is your FPL ID correct?" />;
    } else {
      return <LoadingMessage message="Fetching data.." />;
    }
  };

  const isLoading = fplIdFetchIsLoading || teamPicksFetchIsLoading || teamDataFetchIsLoading;
  const error = fplIdFetchError || teamPicksFetchError || teamDataFetchError;
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
