import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { GetPlayerById, numberWithCommas } from "helpers";
import { AppData } from "types";
import { Gameweek } from "types/gameweek";

interface SummaryDataItem {
  label: string;
  teamCode?: number;
  playerName?: string;
  statValue?: string | number;
}

export default function GameweekSummary(): JSX.Element {
  const appData = useContext(AppDataContext) as AppData;
  const allGameweeks = appData.events;
  const gameweek = allGameweeks.find((gw) => gw.is_current) as Gameweek;
  const players = appData.elements;

  const topPlayerId = gameweek.top_element_info?.id;
  const starPlayer = topPlayerId ? GetPlayerById(topPlayerId, players) : null;
  const mostTransferredIn = gameweek.most_transferred_in
    ? GetPlayerById(gameweek.most_transferred_in, players)
    : null;
  const mostCaptained = gameweek.most_captained
    ? GetPlayerById(gameweek?.most_captained, players)
    : null;
  const mostViceCaptained = gameweek.most_vice_captained
    ? GetPlayerById(gameweek.most_vice_captained, players)
    : null;

  let mostTransferredInCount = "";
  if (mostTransferredIn) {
    mostTransferredInCount = numberWithCommas(mostTransferredIn?.transfers_in_event);
  }

  const summaryData: SummaryDataItem[] = [
    {
      label: "highest score",
      statValue: `${gameweek?.highest_score || 0} pts`
    },
    { label: "average score", statValue: `${gameweek?.average_entry_score} pts` || 0 },
    {
      label: "star player",
      teamCode: starPlayer?.team_code,
      playerName: starPlayer?.web_name || "",
      statValue: `${gameweek?.top_element_info?.points} pts` || 0
    },
    {
      label: "most captained",
      teamCode: mostCaptained?.team_code,
      playerName: mostCaptained ? mostCaptained.web_name : "N/A"
    },
    {
      label: "most vice-captained",
      teamCode: mostViceCaptained?.team_code,
      playerName: mostViceCaptained ? mostViceCaptained.web_name : "N/A"
    },
    {
      label: "most transferred in",
      teamCode: mostTransferredIn?.team_code,
      playerName: mostTransferredIn?.web_name || "",
      statValue: mostTransferredInCount
    }
  ];

  const renderSummaryItem = (item: SummaryDataItem, key: number): JSX.Element => {
    const img: JSX.Element | null = item.teamCode ? (
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/crests/${item.teamCode}.png`}
        alt={`${item.label}-crest-img`}
        height='80%'
      />
    ) : null;

    const itemValue = `
      ${item.playerName || ""}
      ${item.playerName && item.statValue ? " - " : ""}
      ${item.statValue || ""}
    `;

    return (
      <Box
        key={key}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <Typography
          data-testid={`${item.label}-label`}
          variant='h3'
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "center",
            overflow: "hidden"
          }}
        >
          {item.label.toUpperCase()}
        </Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: 1,
            alignItems: "center",
            pt: 0.5,
            justifyContent: "center",
            maxHeight: "2.5em"
          }}
        >
          {img}
          <Typography
            data-testid={`${item.label}-player-name`}
            variant='h6'
            sx={{
              textOverflow: "ellipsis",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
          >
            {itemValue}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        pl: 2,
        pr: 2,
        pt: 8,
        pb: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        rowGap: 3,
        height: "100%"
      }}
    >
      {summaryData.map((stat, index): JSX.Element => renderSummaryItem(stat, index))}
    </Box>
  );
}
