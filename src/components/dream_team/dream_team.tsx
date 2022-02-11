import React from "react";
import { Player as PlayerType } from "types/player";
import { Position } from "types/position";
import _ from "lodash";
import Lineup from "components/lineup/lineup";
import { Squad } from "types/squad";

interface PositionRule {
  type: number;
  count: number;
  max: number;
}
interface DreamTeamProps {
  players: PlayerType[];
  positions: Position[];
}

export default function DreamTeam({ players, positions }: DreamTeamProps) {
  const getTopPlayersByPosition = (positionName: string, max: number): PlayerType[] => {
    const position = _.find(positions, ["singular_name", positionName]);
    const playersByPos = _.filter(players, ["element_type", position?.id]);
    return _(playersByPos).orderBy(["event_points"], ["desc"]).slice(0, max).value();
  };

  // Getting minimum number of players for each position in first XI
  const squad: Squad = {
    goalkeepers: getTopPlayersByPosition("Goalkeeper", 2),
    defenders: getTopPlayersByPosition("Defender", 5),
    midfielders: getTopPlayersByPosition("Midfielder", 5),
    forwards: getTopPlayersByPosition("Forward", 3),
  };

  // Combining remaining players into one array and ordering them by score
  const firstXI: Squad = {
    goalkeepers: squad.goalkeepers.splice(0, 1),
    defenders: squad.defenders.splice(0, 3),
    midfielders: squad.midfielders.splice(0, 2),
    forwards: squad.forwards.splice(0, 2),
  };

  const remainingPlayers = [
    ...squad.goalkeepers,
    ...squad.defenders,
    ...squad.midfielders,
    ...squad.forwards,
  ];
  _.orderBy(remainingPlayers, [["event_points"], ["desc"]]);

  const addPlayerToFirstXI = (player: PlayerType): void => {
    switch (player.element_type) {
      case 1:
        firstXI.goalkeepers.push(player);
        break;
      case 2:
        firstXI.defenders.push(player);
        break;
      case 3:
        firstXI.midfielders.push(player);
        break;
      case 4:
        firstXI.forwards.push(player);
        break;
    }
  };

  const positionRules: PositionRule[] = positions.map((position) => {
    return {
      type: position.id,
      count: position.squad_min_play,
      max: position.squad_max_play,
    } as PositionRule;
  });

  const filterFirstXIPlayers = (): PlayerType[] => {
    while (remainingPlayers.length > 4) {
      let playerAdded = false;
      while (!playerAdded) {
        for (let x = 0; x < remainingPlayers.length; x++) {
          const positionRule: PositionRule | undefined = positionRules.find((rule) => {
            return remainingPlayers[x].element_type === rule.type;
          });
          if (positionRule && positionRule.count < positionRule.max) {
            addPlayerToFirstXI(remainingPlayers[x]);
            remainingPlayers.splice(x, 1);
            playerAdded = true;
          }
        }
      }
    }
    return remainingPlayers;
  };

  const benchPlayers = filterFirstXIPlayers();

  return <Lineup firstXI={firstXI} bench={benchPlayers} />;
}
