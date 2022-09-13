import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { getTeamData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import { auth } from "config";
import { GetPlayerById } from "helpers";
import { useFplId } from "hooks/use_fpl_id";
import { useGameStatus } from "hooks/use_game_status";
import _ from "lodash";
import { AppData, Gameweek } from "types";

import FdrTable from "components/fdr/fdr";
import { Notifier, notifierMessageMap as msgMap } from "components/layout";

export const MyFdr = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const { gameweeks, players } = useContext(AppDataContext) as AppData;
  const { seasonNotStarted } = useGameStatus();
  const currentGameweek = gameweeks.find((gw) => gw.is_current) as Gameweek;
  const fplId = useFplId();

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

  const fdrPlayers = _(teamPicks!.picks)
    .map((pick) => GetPlayerById(pick.element, players))
    .sortBy("element_type")
    .value();

  return <FdrTable players={fdrPlayers} />;
};
