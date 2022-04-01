import React from "react";
import { Gameweek } from "types/gameweek";
import { Box, Grid, Typography } from "@mui/material";
import { Player } from "types/player";
import { GetPlayerById, numberWithCommas } from "helpers";

interface GameweekSummaryProps {
  gameweek: Gameweek;
  players: Player[];
}

interface SummaryDataItem {
  label: string;
  teamCode?: number;
  playerName?: string;
  statValue?: string | number;
}

export default function GameweekSummary({ gameweek, players }: GameweekSummaryProps): JSX.Element {
  const topPlayerId = gameweek.top_element_info?.id;
  const starPlayer = topPlayerId ? GetPlayerById(topPlayerId, players) : undefined;
  const mostTransferredIn = gameweek.most_transferred_in
    ? GetPlayerById(gameweek.most_transferred_in, players)
    : undefined;
  const mostCaptained = gameweek.most_captained
    ? GetPlayerById(gameweek?.most_captained, players)
    : undefined;
  const mostViceCaptained = gameweek.most_vice_captained
    ? GetPlayerById(gameweek.most_vice_captained, players)
    : undefined;

  let mostTransferredInCount = "";
  if (mostTransferredIn) {
    mostTransferredInCount = numberWithCommas(mostTransferredIn?.transfers_in_event);
  }

  const summaryData: SummaryDataItem[] = [
    {
      label: "highest score:",
      statValue: `${gameweek?.highest_score} pts`,
    },
    { label: "average score:", statValue: `${gameweek?.average_entry_score} pts` },
    {
      label: "star player:",
      teamCode: starPlayer?.team_code,
      playerName: `${starPlayer?.first_name} ${starPlayer?.second_name}`,
      statValue: `${gameweek?.top_element_info?.points} pts`,
    },
    {
      label: "most captained:",
      teamCode: mostCaptained?.team_code,
      playerName: `${mostCaptained?.first_name} ${mostCaptained?.second_name}`,
    },
    {
      label: "most vice-captained:",
      teamCode: mostViceCaptained?.team_code,
      playerName: `${mostViceCaptained?.first_name} ${mostViceCaptained?.second_name}`,
    },
    {
      label: "most transferred in:",
      teamCode: mostTransferredIn?.team_code,
      playerName: `${mostTransferredIn?.first_name} ${mostTransferredIn?.second_name}`,
      statValue: `${mostTransferredInCount} transfers`,
    },
  ];

  const renderSummaryItem = (item: SummaryDataItem, key: number): JSX.Element => {
    const img: JSX.Element | undefined = item.teamCode ? (
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/crests/${item.teamCode}.png`}
        alt="crest-img"
        height={30}
      />
    ) : undefined;
    return (
      <Box
        key={key}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {item.label.toUpperCase()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: 1,
            alignItems: "center",
            mt: 0.5,
            justifyContent: "center",
          }}
        >
          {img}
          <Typography
            data-testid={item.label}
            sx={{
              fontSize: "18px",
              textOverflow: "ellipsis",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {item.playerName}
          </Typography>
        </Box>
        <Typography
          data-testid={item.label}
          sx={{
            mt: 0.5,
            fontSize: "18px",
            textOverflow: "ellipsis",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {item.statValue}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        p: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        rowGap: 3,
        height: "100%",
      }}
    >
      {summaryData.map((stat, index): JSX.Element => renderSummaryItem(stat, index))}
    </Box>
  );
}
