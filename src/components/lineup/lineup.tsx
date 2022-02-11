import { Grid } from "@mui/material";
import React from "react";
import { Player as PlayerType } from "types/player";
import Player from "../player/player";
import { Squad } from "types/squad";

interface LineupProps {
  firstXI: Squad;
  bench: PlayerType[];
}

export default function Lineup({ firstXI, bench }: LineupProps) {
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
