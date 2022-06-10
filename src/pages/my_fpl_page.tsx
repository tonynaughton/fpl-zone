import React, { useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getTeamData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import { auth, getUserFplTeamId } from "config/firebase";
import { GetPlayerById } from "helpers";
import _ from "lodash";
import { AppData,Gameweek } from "types";

import FdrTable from "components/fdr/fdr";
import { AppLayout, ComponentContainer, Notifier } from "components/layout";
import { MyTeam } from "components/my_team/my_team";

export const MyFPLPage = (): JSX.Element => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const { gameweeks, players } = useContext(AppDataContext) as AppData;
  const currentGameweek = gameweeks.find((gw) => gw.is_current) as Gameweek;

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  });

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
  } = useQuery([fplId], () => getTeamData(fplId), { enabled: !!fplId }
  );

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

  const checkConditions = (): JSX.Element | void => {
    !fplId && <Notifier message='Please add your FPL ID in Account page' type='error' />;
    fplIdFetchError && <Notifier message='Error getting your FPL ID' type='error' />;
    teamDataFetchError && <Notifier message='Error getting your team data - is your FPL ID correct?' type='error' />;
    teamPicksFetchError && <Notifier message='Error getting your team picks - is your FPL ID correct?' type='error' />;
    (fplIdFetchIsLoading || teamDataFetchIsLoading || teamPicksFetchIsLoading) && <Notifier message='Fetching data..' />;
  };

  const renderTeamComponent = (): JSX.Element => {
    checkConditions();

    if (teamPicks && teamData) {
      return <MyTeam teamData={teamData} teamPicks={teamPicks} />;
    }

    return <Notifier message='Fetching data..' />;
  };

  const renderFdrTable = (): JSX.Element => {
    checkConditions();

    if (teamPicks) {
      const fdrPlayers = _(teamPicks.picks)
        .map((pick) => GetPlayerById(pick.element, players))
        .sortBy("element_type")
        .value();

      return <FdrTable players={fdrPlayers} />;
    }

    return <Notifier message='Fetching data..' />;
  };

  return (
    <AppLayout activeLabel='my fpl' direction='row'>
      <ComponentContainer title='my team'>{renderTeamComponent()}</ComponentContainer>
      <ComponentContainer title='fdr'>{renderFdrTable()}</ComponentContainer>
    </AppLayout>
  );
};
