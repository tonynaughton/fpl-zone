import { Box, Grid } from "@mui/material";
import React, { Component } from "react";
import { Gameweek } from "types/gameweek";
import { Player as PlayerType } from "types/player";
import { Position } from "types/position";
import _ from "lodash";
import Player from "../player/player";

interface LineupProps {
  gameweek?: Gameweek;
  players?: PlayerType[];
  positions?: Position[];
}

interface Team {
  goalkeepers: PlayerType[];
  defenders: PlayerType[];
  midfielders: PlayerType[];
  forwards: PlayerType[];
}

export default function Lineup({ gameweek, players, positions }: LineupProps) {
  const getTopPlayersByPosition = (positionName: string, max: number): PlayerType[] => {
    if (!players) return [];
    const position = _.find(positions, ["singular_name", positionName]);
    const playersByPos = _.filter(players, ["element_type", position?.id]);
    return _(playersByPos).orderBy(["event_points"], ["desc"]).slice(0, max).value();
  };

  const team: Team = {
    goalkeepers: getTopPlayersByPosition("Goalkeeper", 1),
    defenders: getTopPlayersByPosition("Defender", 4),
    midfielders: getTopPlayersByPosition("Midfielder", 4),
    forwards: getTopPlayersByPosition("Forward", 2),
  };

  const renderPlayersRow = (players: PlayerType[]): JSX.Element => {
    if (players.length === 0) {
      return <></>;
    } else if (players.length <= 1) {
      return (
        <Grid item xs={12} alignItems="center" textAlign="center">
          <Player player={players[0]} />
        </Grid>
      );
    } else {
      return (
        <Grid container item xs={12} justifyContent="space-between">
          {players.map((player, index) => {
            return (
              <Grid key={index} item xs={3}>
                <Player player={player} />
              </Grid>
            );
          })}
        </Grid>
      );
    }
  };

  return (
    <Grid container sx={{ pl: 8, pr: 8 }} rowGap={2}>
      {renderPlayersRow(team.goalkeepers)}
      {renderPlayersRow(team.defenders)}
      {renderPlayersRow(team.midfielders)}
      {renderPlayersRow(team.forwards)}
    </Grid>
  );
}
