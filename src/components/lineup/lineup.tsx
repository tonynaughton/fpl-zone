import React from "react";
import { Box, Typography } from "@mui/material";
import { Player as PlayerType } from "types/player";
import Player from "../player/player";
import _ from "lodash";

interface LineupProps {
  selected: PlayerType[][];
  bench: PlayerType[];
}

export default function Lineup({ selected, bench }: LineupProps): JSX.Element {
  const sortedBench = _.sortBy(bench, ["element_type"]);

  const renderSelected = (): JSX.Element => {
    return (
      <Box
        data-testid="first-xi-players"
        sx={{
          p: 5,
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pitch.png)`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          height: "100%",
          rowSpacing: 2,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {selected.map((positionGroup, key) => {
          return (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              {positionGroup.map((player, key) => {
                return <Player player={player} key={key} />;
              })}
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderBench = (): JSX.Element => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", rowGap: 2 }}>
        <Typography fontSize={20}>Bench</Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
            rowSpacing: 2,
            pl: 10,
            pr: 10,
          }}
          data-testid="bench-players"
        >
          {sortedBench.map((player, key) => {
            return <Player player={player} key={key} />;
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ height: "100%", p: 3, display: "flex", flexDirection: "column" }}>
      {renderSelected()}
      {renderBench()}
    </Box>
  );
}
