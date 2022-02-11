import { Grid } from "@mui/material";
import React from "react";
import { Player as PlayerType } from "types/player";
import Player from "../player/player";

interface LineupProps {
  firstXI: PlayerType[][];
  bench: PlayerType[];
}

export default function Lineup({ firstXI, bench }: LineupProps) {
  const renderPlayersRow = (players: PlayerType[], key: number): JSX.Element => {
    return (
      <Grid key={key} container item xs={12} justifyContent="center">
        {players.map((player, key) => {
          return (
            <Grid key={key} item xs={3}>
              <Player player={player} />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Grid container sx={{ pl: 8, pr: 8 }} rowGap={2} maxWidth={1000} margin="auto">
      {firstXI.map((positionGroup, index) => {
        return renderPlayersRow(positionGroup, index);
      })}
    </Grid>
  );
}
