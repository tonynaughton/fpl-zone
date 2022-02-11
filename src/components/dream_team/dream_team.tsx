import React from "react";
import { Player as PlayerType } from "types/player";
import { Position } from "types/position";
import _ from "lodash";
import Lineup from "components/lineup/lineup";

interface DreamTeamProps {
  players: PlayerType[];
  positions: Position[];
}

export default function DreamTeam({ players, positions }: DreamTeamProps) {
  const getTopPlayersByPosition = (positionId: number, max: number): PlayerType[] => {
    const playersByPos = _.filter(players, ["element_type", positionId]);
    return _(playersByPos).orderBy(["event_points"], ["desc"]).slice(0, max).value();
  };

  // Getting top scoring players from each position to make up squad
  const squad = positions.map((position) => {
    return getTopPlayersByPosition(position.id, position.squad_select);
  });

  // Getting minimum number of players for each position in first XI
  const firstXI = squad.map((playerGroup, index) => {
    return playerGroup.splice(0, positions[index].squad_min_play);
  });

  // Combining remaining players into one array
  const remainingPlayers = _(squad).flatten().orderBy(["event_points"], ["desc"]).value();

  // Function which adds remaining players to first XI
  const addRemainingFirstXIPlayers = (): void => {
    while (remainingPlayers.length > 4) {
      let playerAdded = false;
      for (let x = 0; !playerAdded && x < remainingPlayers.length; x++) {
        const pos = remainingPlayers[x].element_type;
        if (firstXI[pos - 1].length < positions[pos - 1].squad_max_play) {
          firstXI[pos - 1].push(remainingPlayers[x]);
          remainingPlayers.splice(x, 1);
          playerAdded = true;
        }
      }
    }
  };

  addRemainingFirstXIPlayers();

  return <Lineup firstXI={firstXI} bench={remainingPlayers} />;
}
