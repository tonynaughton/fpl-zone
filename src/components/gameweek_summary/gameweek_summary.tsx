import React from "react";
import { Gameweek } from "types/gameweek";
import { Box, Grid, Typography } from "@mui/material";
import { Player } from "types/player";
import { GetPlayerById } from "helpers";

interface GameweekSummaryProps {
  gameweek?: Gameweek;
  players?: Player[];
}

export default function GameweekSummary({ gameweek, players }: GameweekSummaryProps): JSX.Element {
  const topPlayerId = gameweek?.top_element_info.id;
  const starPlayer: Player | undefined = GetPlayerById(topPlayerId, players);
  const mostTransferredIn: Player | undefined = GetPlayerById(
    gameweek?.most_transferred_in,
    players
  );
  const mostCaptained: Player | undefined = GetPlayerById(gameweek?.most_captained, players);
  const mostViceCaptained: Player | undefined = GetPlayerById(
    gameweek?.most_vice_captained,
    players
  );

  const summaryData = [
    { label: "star player:", data: `${starPlayer?.web_name}` },
    { label: "highest score:", data: gameweek?.highest_score },
    { label: "average score:", data: gameweek?.average_entry_score },
    { label: "most transferred in:", data: mostTransferredIn?.web_name },
    { label: "most captained:", data: mostCaptained?.web_name },
    { label: "most vice-captained:", data: mostViceCaptained?.web_name },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container alignItems="center" textAlign="center" rowGap={5} sx={{ mb: 5 }}>
        {summaryData.map((stat, index): JSX.Element => {
          return (
            <Grid key={index} item xs={4}>
              <Typography sx={{ fontSize: 25 }}>{stat.label.toUpperCase()}</Typography>
              <Typography sx={{ fontSize: 25 }}>{stat.data}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
