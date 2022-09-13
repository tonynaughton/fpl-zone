import { chunk } from "lodash";
import { Player, Position, TeamPicks } from "types";
import { Lineup } from "types/lineup";

export const getMyTeamLineup = (teamPicks: TeamPicks, positions: Position[], players: Player[]): Lineup => {
  const [selectedPicks, benchPicks] = chunk(teamPicks.picks, 11);

  const getPlayerById = (id: number): Player => players.find((player) => player.id === id)!;

  const selected = positions.map((pos => {
    const picks = selectedPicks.filter(pick => getPlayerById(pick.element).element_type === pos.id);

    return picks.map((pick) => getPlayerById(pick.element));
  }));

  const bench = benchPicks.map((pick) => getPlayerById(pick.element));

  return { selected, bench };
};
