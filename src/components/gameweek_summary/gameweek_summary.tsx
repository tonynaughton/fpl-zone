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
      data: `${starPlayer?.web_name}`,
      teamCode: starPlayer?.team_code,
    },
    { label: "highest score:", data: gameweek?.highest_score },
    { label: "average score:", data: gameweek?.average_entry_score },
    {
      label: "most transferred in:",
      data: mostTransferredIn?.web_name,
      teamCode: mostTransferredIn?.team_code,
    },
    {
      label: "most captained:",
      data: mostCaptained?.web_name,
      teamCode: mostCaptained?.team_code,
    },
    {
      label: "most vice-captained:",
      data: mostViceCaptained?.web_name,
      teamCode: mostViceCaptained?.team_code,
    },
  ];

  const renderGridItem = (item: SummaryDataItem, key: number) => {
    const img: JSX.Element | undefined = item.teamCode ? (
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/crests/${item.teamCode}.png`}
        alt="crest-img"
        key={key}
        height={75}
        width={75}
      />
    ) : undefined;
    return (
      <Grid item xs={4}>
        {img}
        <Typography sx={{ fontSize: 25 }}>{item.label.toUpperCase()}</Typography>
        <Typography sx={{ fontSize: 25 }}>{item.data || "N/A"}</Typography>
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
