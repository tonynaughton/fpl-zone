import { useContext } from "react";
import { AppDataContext } from "app_content";
import _ from "lodash";
import { AppData, Player } from "types";
import { Lineup } from "types/lineup";

export const useDreamTeamLineup = (): Lineup => {
  const { positions, players } = useContext(AppDataContext) as AppData;

  const squad = positions.map((pos): Player[] => _(players)
    .filter(["element_type", pos.id])
    .orderBy(["event_points"], ["desc"])
    .slice(0, pos.squad_select)
    .value()
  );

  const selected = squad.map((playersByPos, index) => playersByPos.splice(0, positions[index].squad_min_play));
  const bench: Player[] = [];

  const remainingPlayers = _(squad)
    .flatten()
    .orderBy(["event_points"], ["desc"])
    .value();

  remainingPlayers.forEach((player) => {
    const pos = player.element_type;
    const flatSelectedLen = selected.flat().length;
    const posSelectedLen = selected[pos - 1].length;
    const posSelectedMax = positions[pos - 1].squad_max_play;

    flatSelectedLen < 11 && posSelectedLen < posSelectedMax
      ? selected[pos - 1].push(player)
      : bench.push(player);
  });

  return { selected, bench };
};
