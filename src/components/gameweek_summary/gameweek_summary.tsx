import React from "react";
import { Gameweek } from "types/gameweek";
import { Box, Grid, Typography } from "@mui/material";
import { Player } from "types/player";
import { GetPlayerById } from "helpers";

interface GameweekSummaryProps {
  gameweek?: Gameweek;
  players?: Player[];
}

interface SummaryDataItem {
  label: string;
  data?: string | number;
  teamCode?: number;
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

  const summaryData: SummaryDataItem[] = [
    {
      label: "star player:",
      data: `${starPlayer?.web_name} - ${gameweek?.top_element_info.points}`,
      teamCode: starPlayer?.team_code,
    },
    {
      label: "most captained:",
      data: mostCaptained?.web_name,
      teamCode: mostCaptained?.team_code,
    },
    { label: "highest score:", data: `${gameweek?.highest_score}` },
    {
      label: "most transferred in:",
      data: `${mostTransferredIn?.web_name} - ${mostTransferredIn?.transfers_in_event}`,
      teamCode: mostTransferredIn?.team_code,
    },
    {
      label: "most vice-captained:",
      data: mostViceCaptained?.web_name,
      teamCode: mostViceCaptained?.team_code,
    },
    { label: "average score:", data: `${gameweek?.average_entry_score}` },
  ];

  const renderGridItem = (item: SummaryDataItem, key: number) => {
    const img: JSX.Element | undefined = item.teamCode ? (
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/crests/${item.teamCode}.png`}
        alt="crest-img"
        height={40}
        width={40}
      />
    ) : undefined;
    return (
      <Grid item xs={4} key={key}>
        <Typography sx={{ fontSize: 30 }}>{item.label.toUpperCase()}</Typography>
        <Grid
          container
          alignItems="center"
          columnGap={2}
          justifyContent="center"
          sx={{ mt: 2, width: "100%" }}
        >
          <Grid item>{img}</Grid>
          <Grid item>
            <Typography data-testid={item.label} sx={{ fontSize: 24 }}>
              {item.data || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container alignItems="center" textAlign="center" rowGap={5} sx={{ mb: 5 }}>
        {summaryData.map((stat, index): JSX.Element => renderGridItem(stat, index))}
      </Grid>
    </Box>
  );
}
