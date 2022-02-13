import React from "react";
import { Grid, Typography } from "@mui/material";
import { Player as PlayerType } from "types/player";
import Player from "../player/player";
import _ from "lodash";

interface LineupProps {
  firstXI: PlayerType[][];
  bench: PlayerType[];
}

export default function Lineup({ firstXI, bench }: LineupProps): JSX.Element {
  const sortedBench = _.sortBy(bench, ["element_type"]);

  const renderFirstXI = (): JSX.Element => {
    return (
      <Grid
        item
        container
        sx={{
          pl: 8,
          pr: 8,
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pitch.png)`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
        rowGap={2}
        maxWidth={1000}
        margin="auto"
        xs={10}
        data-testid="first-xi-players"
      >
        {firstXI.map((positionGroup, key) => {
          return (
            <Grid key={key} container item xs={12} justifyContent="center">
              {positionGroup.map((player, key) => {
                return (
                  <Grid key={key} item xs={2}>
                    <Player player={player} />
                  </Grid>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const renderBench = (): JSX.Element => {
    return (
      <Grid
        container
        item
        justifyContent="center"
        direction="column"
        rowGap={1}
        xs={2}
        data-testid="bench-players"
      >
        <Grid item>
          <Typography fontSize={20} textAlign="center" sx={{ mb: 1 }}>
            BENCH
          </Typography>
        </Grid>
        {sortedBench.map((player, key) => {
          return (
            <Grid item key={key}>
              <Player player={player} />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Grid height="100%" container>
      {renderFirstXI()}
      {renderBench()}
    </Grid>
  );
}
