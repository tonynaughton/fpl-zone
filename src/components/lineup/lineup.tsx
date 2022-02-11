import { Grid } from "@mui/material";
import React from "react";
import { Player as PlayerType } from "types/player";
import Player from "../player/player";
import { Squad } from "types/squad";
import _ from "lodash";
import { Position } from "types/position";

interface PositionRule {
  type: number;
  count: number;
  max: number;
}
interface LineupProps {
  squad: Squad;
  positions?: Position[];
}

export default function Lineup({ squad, positions }: LineupProps) {
  // Getting minimum number of players for each position in first XI
  const firstXI: Squad = {
    goalkeepers: squad.goalkeepers.splice(0, 1),
    defenders: squad.defenders.splice(0, 3),
    midfielders: squad.midfielders.splice(0, 2),
    forwards: squad.forwards.splice(0, 2),
  };

  // Combining remaining players into one array and ordering them by score
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

  const positionRules: PositionRule[] = [];
  positions?.forEach((position) => {
    positionRules.push({
      type: position.id,
      count: position.squad_min_play,
      max: position.squad_max_play,
    } as PositionRule);
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
            remainingPlayers.splice(x, 1);
            addPlayerToFirstXI(remainingPlayers[x]);
            playerAdded = true;
          }
        }
      }
    }
    return remainingPlayers;
  };

  const benchPlayers = filterFirstXIPlayers();
  console.log("🚀 ~ file: lineup.tsx ~ line 83 ~ Lineup ~ benchPlayers", benchPlayers);

  const renderPlayersRow = (players: PlayerType[]): JSX.Element => {
    return (
      <Grid container item xs={12} justifyContent="center">
        {players.map((player, index) => {
          return (
            <Grid key={index} item xs={3}>
              <Player player={player} />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Grid container sx={{ pl: 8, pr: 8 }} rowGap={2} maxWidth={1000} margin="auto">
      {renderPlayersRow(firstXI.goalkeepers)}
      {renderPlayersRow(firstXI.defenders)}
      {renderPlayersRow(firstXI.midfielders)}
      {renderPlayersRow(firstXI.forwards)}
    </Grid>
  );
}
