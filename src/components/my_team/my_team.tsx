import React from "react";
import { useMyTeamLineup } from "hooks";
import { TeamData, TeamPicks } from "types";

import Lineup from "components/lineup/lineup";

interface MyTeamProps {
  teamPicks: TeamPicks;
  teamData: TeamData;
}

export const MyTeam = ({ teamPicks, teamData }: MyTeamProps): JSX.Element => {
  const { selected, bench } = useMyTeamLineup(teamPicks);

  return (
    <Lineup
      bench={bench}
      selected={selected}
      teamData={teamData}
      teamPicks={teamPicks}
    />
  );
};
