import React from "react";
import { useDreamTeamLineup } from "hooks/use_dream_team_lineup";
import { useGameStatus } from "hooks/use_game_status";

import { Notifier } from "components/layout";
import Lineup from "components/lineup/lineup";

export default function DreamTeam(): JSX.Element {
  const { seasonNotStarted, gameUpdating } = useGameStatus();
  const lineup = useDreamTeamLineup();

  if (seasonNotStarted) {
    return <Notifier message='This data will be available once the season has started.' type='warning' />;
  }

  if (gameUpdating) {
    return <Notifier message='Game is updating..' type='warning' />;
  }

  return <Lineup lineup={lineup} />;
}
