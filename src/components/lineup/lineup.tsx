import { Grid } from "@mui/material";
import React from "react";
import { Player as PlayerType } from "types/player";
import Player from "../player/player";
import { Squad } from "types/squad";

interface LineupProps {
  squad: Squad;
}

export default function Lineup({ squad }: LineupProps) {
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
    }
  };

  return (
    <Grid container sx={{ pl: 8, pr: 8 }} rowGap={2} maxWidth={1000} margin="auto">
      {renderPlayersRow(squad.goalkeepers)}
      {renderPlayersRow(squad.defenders)}
      {renderPlayersRow(squad.midfielders)}
      {renderPlayersRow(squad.forwards)}
    </Grid>
  );
}
