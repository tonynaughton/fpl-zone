import React from "react";
import { useDreamTeamLineup } from "hooks/use_dream_team_lineup";
import { useGameStatus } from "hooks/use_game_status";

import { Notifier, notifierMessageMap as msgMap,NotifierType } from "components/layout";
import Lineup from "components/lineup/lineup";

export default function DreamTeam(): JSX.Element {
  const { seasonNotStarted, gameUpdating } = useGameStatus();
  const { selected, bench } = useDreamTeamLineup();

  if (seasonNotStarted) {
    return <Notifier message={msgMap.seasonNotStarted} type={NotifierType.Warning} />;
  }

  if (gameUpdating) {
    return <Notifier message={msgMap.gameUpdating} type={NotifierType.Warning} />;
  }

  return <Lineup bench={bench} selected={selected} />;
}
