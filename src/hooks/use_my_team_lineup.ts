import { useContext } from "react";
import { AppDataContext } from "app_content";
import { chunk } from "lodash";
import { AppData, Player, TeamPicks } from "types";
import { Lineup } from "types/lineup";

export const useMyTeamLineup = (teamPicks: TeamPicks): Lineup => {
  const { positions, players } = useContext(AppDataContext) as AppData;
  const [selectedPicks, benchPicks] = chunk(teamPicks.picks, 11);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const getPlayerById = (id: number): Player => players.find((player) => player.id === id)!;

  const selected = positions.map((pos => {
    const picks = selectedPicks.filter(pick => getPlayerById(pick.element).element_type === pos.id);

    return picks.map((pick) => getPlayerById(pick.element));
  }));

  const bench = benchPicks.map((pick) => getPlayerById(pick.element));

  return { selected, bench };
};
