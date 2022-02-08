import React from "react";
import { Gameweek } from "types/gameweek";
import { Box, Grid, Typography } from "@mui/material";
import { Player } from "types/player";
import { Team } from "types/team";

interface GameweekSummaryProps {
  gameweek?: Gameweek;
  starPlayer?: Player;
  topTeam?: Team;
}

export default function GameweekSummary({
  gameweek,
  starPlayer,
  topTeam,
}: GameweekSummaryProps): JSX.Element {
  const gameweekStats = [
    { label: "Star Player", data: `${starPlayer?.web_name} ${gameweek?.top_element_info.points}` },
    { label: "Top Team", data: `${topTeam?.name} ${gameweek?.highest_score}` },
    { label: "Average Score", data: gameweek?.average_entry_score },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container alignItems="center" textAlign="center">
        {gameweekStats.map((stat, index): JSX.Element => {
          return (
            <Grid key={index} item xs={4}>
              <Typography>{stat.label}</Typography>
              <Typography>{stat.data}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
