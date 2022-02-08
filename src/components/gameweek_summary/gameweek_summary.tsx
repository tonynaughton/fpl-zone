import React from "react";
import { Gameweek } from "types/gameweek";
import { Box, Grid, Typography } from "@mui/material";
import { Player } from "types/player";
import { GetPlayerById, getTeamShirtColour } from "helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";

interface GameweekSummaryProps {
  gameweek?: Gameweek;
  players?: Player[];
}

export default function GameweekSummary({ gameweek, players }: GameweekSummaryProps): JSX.Element {
  const topPlayerId = gameweek?.top_element_info?.id;
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
    {
      label: "star player:",
      data: `${starPlayer?.web_name}` || "N/A",
      teamCode: starPlayer?.team_code,
    },
    { label: "highest score:", data: gameweek?.highest_score || "N/A" },
    { label: "average score:", data: gameweek?.average_entry_score || "N/A" },
    {
      label: "most transferred in:",
      data: mostTransferredIn?.web_name || "N/A",
      teamCode: mostTransferredIn?.team_code,
    },
    {
      label: "most captained:",
      data: mostCaptained?.web_name || "N/A",
      teamCode: mostCaptained?.team_code,
    },
    {
      label: "most vice-captained:",
      data: mostViceCaptained?.web_name || "N/A",
      teamCode: mostViceCaptained?.team_code,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container alignItems="center" textAlign="center" rowGap={5} sx={{ mb: 5 }}>
        {summaryData.map(
          (stat, index): JSX.Element => (
            <Grid key={index} item xs={4}>
              {stat.teamCode && (
                <FontAwesomeIcon
                  icon={faTshirt}
                  size="3x"
                  color={getTeamShirtColour(stat.teamCode)}
                />
              )}
              <Typography sx={{ fontSize: 25 }}>{stat.label.toUpperCase()}</Typography>
              <Typography sx={{ fontSize: 25 }}>{stat.data}</Typography>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
