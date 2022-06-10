import React, { useContext } from "react";
import { AppDataContext } from "app_content";
import { GetPlayerById } from "helpers";
import _ from "lodash";
import { AppData, Player, TeamData, TeamPicks } from "types";

import Lineup from "components/lineup/lineup";

interface MyTeamProps {
  teamPicks: TeamPicks;
  teamData: TeamData;
}

export const MyTeam = ({ teamPicks, teamData }: MyTeamProps): JSX.Element => {
  const { positions, players } = useContext(AppDataContext) as AppData;

  const selectedByPos: Player[][] = [];
  const firstXIPicks = _.slice(teamPicks?.picks, 0, 11);
  positions.forEach((pos) => {
    const picks = firstXIPicks.filter((pick) => {
      const player = GetPlayerById(pick.element, players);

      return player.element_type === pos.id;
    });
    const playersByPos = picks.map((pick) => GetPlayerById(pick.element, players));
    selectedByPos.push(playersByPos);
  });

  const benchPlayersPicks = teamPicks.picks.slice(11, 15);

  const benchPlayers = benchPlayersPicks.map((pick) => GetPlayerById(pick.element, players));

  return (
    <Lineup
      bench={benchPlayers}
      compressed
      selected={selectedByPos}
      teamData={teamData as TeamData}
      teamPicks={teamPicks}
    />
  );
};
