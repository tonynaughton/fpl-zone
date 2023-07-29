import React, { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { getTeamData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import { auth } from "config";
import { useFplId } from "hooks/use_fpl_id";
import { useGameStatus } from "hooks/use_game_status";
import { AppData, Gameweek } from "types";

import { Notifier } from "components/layout";
import Lineup from "components/lineup/lineup";

import { getMyTeamLineup } from "./get_my_team_lineup";

export const MyTeam = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const { gameweeks, positions, players } = useContext(AppDataContext) as AppData;
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
    return <Notifier message='This data will be available once the season has started.' type='warning' />;
  }

  if (!fplId) {
    if (!user) {
      return <Notifier message='You must login with your FPL ID to view this data' type='warning' />;
    }

    return <Notifier message='A valid FPL ID is required to view this data - please add one to your account' type='error' />;
  }

  if (teamDataFetchIsLoading || teamPicksFetchIsLoading) {
    return <Notifier message='Fetching data..' />;
  }

  if (teamDataFetchError || !teamData) {
    return <Notifier message='Error getting your team data' type='error' />;
  }

  if (teamPicksFetchError || !teamPicks) {
    return <Notifier message='Error getting your team picks' type='error' />;
  }

  const lineup = getMyTeamLineup(teamPicks!, positions, players);

  return (
    <Lineup
      lineup={lineup}
      teamData={teamData}
      teamPicks={teamPicks}
    />
  );
};
