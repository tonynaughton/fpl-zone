import React from "react";
import { useDreamTeamLineup } from "hooks/use_dream_team_lineup";
import { GAME_STATUS_MESSAGES, useGameStatus } from "hooks/use_game_status";

import { Notifier, NotifierType } from "components/layout";
import Lineup from "components/lineup/lineup";

export default function DreamTeam(): JSX.Element {
  const { seasonNotStarted, gameUpdating } = useGameStatus();
  const { selected, bench } = useDreamTeamLineup();

  if (seasonNotStarted) {
    return <Notifier message={GAME_STATUS_MESSAGES.SEASON_NOT_STARTED} type={NotifierType.Warning} />;
  }

  if (gameUpdating) {
    return <Notifier message={GAME_STATUS_MESSAGES.GAME_UPDATING} type={NotifierType.Warning} />;
  }

  return <Lineup bench={bench} selected={selected} />;
}
