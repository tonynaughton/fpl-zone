import React from "react";
import { useDreamTeamLineup } from "hooks/use_dream_team_lineup";

import Lineup from "components/lineup/lineup";

export default function DreamTeam(): JSX.Element {
  const { selected, bench } = useDreamTeamLineup();

  return <Lineup bench={bench} selected={selected} />;
}
