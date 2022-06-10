import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { getTeamData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import { auth, getUserFplTeamId } from "config/firebase";
import { checkGameStatus, gameStatusValues, GetPlayerById } from "helpers";
import _ from "lodash";
import { AppData,Gameweek, Player, TeamData, TeamPicks } from "types";

import FdrTable from "components/fdr/fdr";
import { AppLayout, ComponentContainer, Notifier } from "components/layout";
import Lineup from "components/lineup/lineup";

export const MyTeamPage = (): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

  const appData = useContext(AppDataContext) as AppData;
  const currentGameweek = appData.events.find((gw) => gw.is_current) as Gameweek;

  // Fetching users stored FPL ID (if exists)
  const {
    data: fplId,
    isLoading: fplIdFetchIsLoading,
    error: fplIdFetchError
  } = useQuery([user?.uid], getUserFplTeamId);

  // Fetching users FPL team data
  const {
    data: teamData,
    error: teamDataFetchError,
    isLoading: teamDataFetchIsLoading
  } = useQuery([fplId], () => getTeamData(fplId), {
    enabled: !!fplId
  });

  // Fetching users selection picks for current gameweek
  const {
    data: teamPicks,
    error: teamPicksFetchError,
    isLoading: teamPicksFetchIsLoading
  } = useQuery(
    [fplId, currentGameweek],
    () => getTeamPicksForGameweek(fplId, currentGameweek.id),
    { enabled: !!fplId }
  );

  // Component which renders if user has no FPL ID stored
  const EnterFPLID = (): JSX.Element => {
    return (
      <Box
        alignItems='center'
        display='flex'
        justifyContent='center'
        sx={{ height: "100%" }}
      >
        Please add your FPL ID in&nbsp;
        <Link style={{ textDecoration: "none", color: "#16B7EA" }} to='/account'>
          Account
        </Link>
      </Box>
    );
  };

  const renderTeamComponent = (): JSX.Element => {
    const gameUpdatingStatus = checkGameStatus(appData.events);
    if (!fplId) {
      return <EnterFPLID />;
    } else if (gameUpdatingStatus === gameStatusValues.GAME_UPDATING) {
      return <Notifier message='Game is updating' />;
    } else if (teamPicks && teamData) {
      // Function which returns an array of players divided into sub arrays by position
      const getSelectedPlayers = (): Player[][] => {
        const selectedByPos: Player[][] = [];
        const firstXIPicks = _.slice(teamPicks?.picks, 0, 11);
        appData.element_types.forEach((pos) => {
          const picks = firstXIPicks.filter((pick) => {
            const player = GetPlayerById(pick.element, appData.elements);

            return player.element_type === pos.id;
          });
          const players = picks.map((pick) => GetPlayerById(pick.element, appData.elements));
          selectedByPos.push(players);
        });

        return selectedByPos;
      };

      // Function which returns bench players as array
      const getBenchPlayers = (): Player[] => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const benchPlayersPicks = teamPicks!.picks.slice(11, 15);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const benchPlayers = benchPlayersPicks.map((pick) => GetPlayerById(pick.element, appData!.elements));

        return benchPlayers;
      };

      return (
        <Lineup
          bench={getBenchPlayers()}
          compressed
          selected={getSelectedPlayers()}
          teamData={teamData as TeamData}
          teamPicks={teamPicks as TeamPicks}
        />
      );
    } else if (fplIdFetchError) {
      return <Notifier message='Error getting FPL ID' type='error' />;
    } else if (teamDataFetchError) {
      return <Notifier message='Error getting your team data - is your FPL ID correct?' type='error' />;
    } else if (teamPicksFetchError) {
      return <Notifier message='Error getting your team picks - is your FPL ID correct?' type='error' />;
    }

    return <Notifier message='Fetching data..' />;

  };

  const renderFdrTable = (): JSX.Element => {
    if (!fplId) {
      return <EnterFPLID />;
    } else if (teamPicks) {
      const fdrPlayers = _(teamPicks.picks)
        .map((pick) => GetPlayerById(pick.element, appData.elements))
        .sortBy("element_type")
        .value();

      return <FdrTable players={fdrPlayers} />;
    } else if (fplIdFetchError) {
      return <Notifier message='Error getting FPL ID' type='error' />;
    } else if (teamDataFetchError) {
      return <Notifier message='Error getting your team data - is your FPL ID correct?' type='error' />;
    } else if (teamPicksFetchError) {
      return <Notifier message='Error getting your team picks - is your FPL ID correct?' type='error' />;
    }

    return <Notifier message='Fetching data..' />;

  };

  const isLoading = fplIdFetchIsLoading || teamDataFetchIsLoading || teamPicksFetchIsLoading;
  const error = fplIdFetchError || teamDataFetchError || teamPicksFetchError;
  const errorMessage = error instanceof Error ? error.message : undefined;

  return (
    <AppLayout activeLabel='my team' direction='row'>
      <ComponentContainer error={errorMessage} isLoading={isLoading} title='team'>
        {renderTeamComponent()}
      </ComponentContainer>
      <ComponentContainer error={errorMessage} isLoading={isLoading} title='fdr'>
        {renderFdrTable()}
      </ComponentContainer>
    </AppLayout>
  );
};
