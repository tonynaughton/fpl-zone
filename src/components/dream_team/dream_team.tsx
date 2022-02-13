import React from "react";
import { Player as PlayerType } from "types/player";
import { Position } from "types/position";
import _ from "lodash";
import Lineup from "components/lineup/lineup";
import { selectLineup } from "helpers";

interface DreamTeamProps {
  players: PlayerType[];
  positions: Position[];
}

export default function DreamTeam({ players, positions }: DreamTeamProps): JSX.Element {
  const getTopPlayersByPosition = (positionId: number, max: number): PlayerType[] => {
    const playersByPos = _.filter(players, ["element_type", positionId]);
    return _(playersByPos).orderBy(["event_points"], ["desc"]).slice(0, max).value();
  };

  // Getting top scoring players from each position to make up squad
  const squad = positions.map((position) => {
    return getTopPlayersByPosition(position.id, position.squad_select);
  });

  // Divides squad into first XI and bench players using selectLineup helper function
  const { firstXIPlayers, benchPlayers } = selectLineup(squad, positions);

  return <Lineup firstXI={firstXIPlayers} bench={benchPlayers} />;
}
