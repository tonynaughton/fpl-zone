import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { getTeamData, getTeamPicksForGameweek } from "api/fpl_api_provider";
import { AppDataContext, FplIdContext } from "app_content";
import { auth, getUserFplTeamId } from "config";
import { GetPlayerById } from "helpers";
import _ from "lodash";
import { AppData,Gameweek } from "types";

import FdrTable from "components/fdr/fdr";
import { AppLayout, ComponentContainer, Notifier } from "components/layout";
import { MyTeam } from "components/my_team/my_team";

export const MyFPLPage = (): JSX.Element => {
  const [user] = useAuthState(auth);
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
    if (teamDataFetchError) return <Notifier message='Error getting your team data - is your FPL ID correct?' type='error' />;
    if (teamPicksFetchError) return <Notifier message='Error getting your team picks - is your FPL ID correct?' type='error' />;
    if (teamDataFetchIsLoading || teamPicksFetchIsLoading) return <Notifier message='Fetching data..' />;
  };

  const renderTeamComponent = (): JSX.Element => {
    if (!fplId) {
      if (!user) return <Notifier message='You must login with an FPL ID to view this data' type='error' />;

      return <Notifier message='You must add an FPL ID to your account to view this data' type='error' />;
    }

    checkConditions();

    if (teamPicks && teamData) {
      return <MyTeam teamData={teamData} teamPicks={teamPicks} />;
    }

    return <Notifier message='Fetching data..' />;
  };

  const renderFdrTable = (): JSX.Element => {
    if (!fplId) {
      if (!user) return <Notifier message='You must login with an FPL ID to view this data' type='error' />;

      return <Notifier message='You must add an FPL ID to your account to view this data' type='error' />;
    }

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
    <AppLayout active='my fpl' direction='row'>
      <ComponentContainer title='my team'>{renderTeamComponent()}</ComponentContainer>
      <ComponentContainer title='fdr'>{renderFdrTable()}</ComponentContainer>
    </AppLayout>
  );
};
