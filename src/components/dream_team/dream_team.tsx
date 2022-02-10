import React from "react";
import { Player as PlayerType } from "types/player";
import { Position } from "types/position";
import _ from "lodash";
import Lineup from "components/lineup/lineup";
import { Squad } from "types/squad";

interface DreamTeamProps {
  players?: PlayerType[];
  positions?: Position[];
}

export default function DreamTeam({ players, positions }: DreamTeamProps) {
  const getTopPlayersByPosition = (positionName: string, max: number): PlayerType[] => {
    if (!players) return [];
    const position = _.find(positions, ["singular_name", positionName]);
    const playersByPos = _.filter(players, ["element_type", position?.id]);
    return _(playersByPos).orderBy(["event_points"], ["desc"]).slice(0, max).value();
  };

  const squad: Squad = {
    goalkeepers: getTopPlayersByPosition("Goalkeeper", 1),
    defenders: getTopPlayersByPosition("Defender", 4),
    midfielders: getTopPlayersByPosition("Midfielder", 4),
    forwards: getTopPlayersByPosition("Forward", 2),
  };

  return <Lineup squad={squad} />;
}
