import React from "react";
import { Gameweek } from "types/gameweek";
import { Box, Grid } from "@mui/material";

interface GameweekSummaryProps {
  gameweek: Gameweek;
}

export default function GameweekSummary({ gameweek }: GameweekSummaryProps): JSX.Element {
  console.log("🚀 ~ file: gameweek_summary.tsx ~ line 10 ~ GameweekSummary ~ gameweek", gameweek);
  if (!gameweek) return <></>;

  const starPlayerInfo = gameweek.top_element_info;
  const topTeam = gameweek.highest_scoring_entry;
  const averageScore = gameweek.average_entry_score;

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box>{starPlayerInfo.points}</Box>
      </Grid>
      <Grid item xs={4}>
        <Box>{topTeam}</Box>
      </Grid>
      <Grid item xs={4}>
        <Box>{averageScore}</Box>
      </Grid>
      <Grid item xs={4}>
        <Box>Data</Box>
      </Grid>
      <Grid item xs={4}>
        <Box>Data</Box>
      </Grid>
      <Grid item xs={4}>
        <Box>Data</Box>
      </Grid>
    </Grid>
  );
}
