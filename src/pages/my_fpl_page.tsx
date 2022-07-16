import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Box } from "@mui/material";
import { getTeamData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import { AppDataContext, FplIdContext } from "app_content";
import { auth, getUserFplTeamId } from "config";
import { GetPlayerById } from "helpers";
import { useGameStatus } from "hooks/use_game_status";
import _ from "lodash";
import { AppData,Gameweek } from "types";

import FdrTable from "components/fdr/fdr";
import { AppLayout, ComponentContainer, Notifier, notifierMessageMap as msgMap } from "components/layout";
import { MyTeam } from "components/my_team/my_team";

export const MyFPLPage = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const { seasonNotStarted } = useGameStatus();
  const { gameweeks, players } = useContext(AppDataContext) as AppData;
  const { fplId: savedFplId } = useContext(FplIdContext);
  const currentGameweek = gameweeks.find((gw) => gw.is_current) as Gameweek;
  const [fplId, setFplId] = useState<number | undefined>();

  useEffect(() => {
    const getUserFplId = async (): Promise<void> => {
      const id = user ? await getUserFplTeamId(user.uid) : savedFplId;
      setFplId(id);
    };

    getUserFplId();
  }, [user, savedFplId]);

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
    () => getTeamPicksForGameweek(currentGameweek.id, fplId),
    { enabled: !!fplId }
  );

  const checkConditions = (): JSX.Element | void => {
    if (seasonNotStarted) {
      return <Notifier message={msgMap.seasonNotStarted} type='warning' />;
    }

    if (!fplId) {
      if (!user) {
        return <Notifier message={msgMap.fplIdLoginRequired} type='warning' />;
      }

      return <Notifier message={msgMap.fplIdRequired} type='error' />;
    }

    if (teamDataFetchIsLoading || teamPicksFetchIsLoading) return <Notifier message={msgMap.fetching} />;
    if (teamDataFetchError || !teamData) return <Notifier message={msgMap.teamDataFetchError} type='error' />;
    if (teamPicksFetchError || !teamPicks) return <Notifier message={msgMap.teamPicksFetchError} type='error' />;
  };

  const renderTeamComponent = (): JSX.Element => {
    return checkConditions() || <MyTeam teamData={teamData!} teamPicks={teamPicks!} />;
  };

  const renderFdrTable = (): JSX.Element => {
    const notifier = checkConditions();

    if (notifier) return notifier;

    const fdrPlayers = _(teamPicks!.picks)
      .map((pick) => GetPlayerById(pick.element, players))
      .sortBy("element_type")
      .value();

    return <FdrTable players={fdrPlayers} />;
  };

  return (
    <AppLayout activeId='my-fpl'>
      <Box flexBasis='50%'>
        <ComponentContainer title='my team'>{renderTeamComponent()}</ComponentContainer>
      </Box>
      <Box flexBasis='50%'>
        <ComponentContainer title='fdr'>{renderFdrTable()}</ComponentContainer>
      </Box>
    </AppLayout>
  );
};
