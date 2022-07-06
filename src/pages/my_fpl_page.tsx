import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { getTeamData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import { AppDataContext, FplIdContext } from "app_content";
import { auth, getUserFplTeamId } from "config";
import { GetPlayerById } from "helpers";
import { useGameStatus } from "hooks/use_game_status";
import _ from "lodash";
import { AppData,Gameweek } from "types";

import FdrTable from "components/fdr/fdr";
import { AppLayout, ComponentContainer, Notifier, notifierMessageMap as msgMap, NotifierType } from "components/layout";
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
      return <Notifier message={msgMap.seasonNotStarted} type={NotifierType.Warning} />;
    }

    if (!fplId) {
      if (!user) {
        return <Notifier message={msgMap.fplIdLoginRequired} type={NotifierType.Error} />;
      }

      return <Notifier message={msgMap.fplIdRequired} type={NotifierType.Error} />;
    }

    if (teamDataFetchIsLoading || teamPicksFetchIsLoading) return <Notifier message={msgMap.fetching} />;
    if (teamDataFetchError || !teamData) return <Notifier message={msgMap.teamDataFetchError} type={NotifierType.Error} />;
    if (teamPicksFetchError || !teamPicks) return <Notifier message={msgMap.teamPicksFetchError} type={NotifierType.Error} />;
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
    <AppLayout active='my fpl'>
      <ComponentContainer title='my team'>{renderTeamComponent()}</ComponentContainer>
      <ComponentContainer title='fdr'>{renderFdrTable()}</ComponentContainer>
    </AppLayout>
  );
};
