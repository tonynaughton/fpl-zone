import React from "react";
import { Player } from "types/player";
import { Position } from "types/position";
import _ from "lodash";
import Lineup from "components/lineup/lineup";

interface DreamTeamProps {
  players: Player[];
  positions: Position[];
}

export default function DreamTeam({ players, positions }: DreamTeamProps): JSX.Element {
  const getTopPlayersByPosition = (positionId: number, max: number): Player[] => {
    return _(players)
      .filter(["element_type", positionId])
      .orderBy(["event_points"], ["desc"])
      .slice(0, max)
      .value();
  };

  // Getting top scoring players from each position to make up squad
  const squad = positions.map((position) => {
    return getTopPlayersByPosition(position.id, position.squad_select);
  });

  // Initialise selected players with minimum required for each position
  const selectedPlayers = squad.map((playerGroup, index) => {
    return playerGroup.splice(0, positions[index].squad_min_play);
  });

  // Flatten remaining players into one array
  const remainingPlayers = _(squad).flatten().orderBy(["event_points"], ["desc"]).value();

  // Recursive function which adds remaining selected players
  const addRemainingSelectedPlayers = (playerGroup: Player[]): Player[] => {
    let playerAdded = false;
    playerGroup.forEach((player, index) => {
      if (!playerAdded) {
        const pos = player.element_type;
        // If player's position is not at maximum allowed
        if (selectedPlayers[pos - 1].length < positions[pos - 1].squad_max_play) {
          selectedPlayers[pos - 1].push(player);
          playerGroup.splice(index, 1);
          playerAdded = true;
        }
      }
    });

    // Recurively call the function until 4 players remain (bench players)
    if (playerGroup.length > 4) {
      addRemainingSelectedPlayers(playerGroup);
    }

    return playerGroup;
  };

  const benchPlayers = addRemainingSelectedPlayers(remainingPlayers);

  return <Lineup selected={selectedPlayers} bench={benchPlayers} />;
}
