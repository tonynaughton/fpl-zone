import React, { useContext } from "react";
import { Gameweek } from "types/gameweek";
import { Box, Typography } from "@mui/material";
import { GetPlayerById, numberWithCommas } from "helpers";
import { AppDataContext } from "app_content";
import { AppData } from "types";

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
      label: "highest score",
      statValue: `${gameweek?.highest_score || 0} pts`,
    },
    { label: "average score", statValue: `${gameweek?.average_entry_score || 0} pts` },
    {
      label: "star player",
      teamCode: starPlayer?.team_code,
      playerName: starPlayer?.web_name || "",
      statValue: `${gameweek?.top_element_info?.points || 0} pts`,
    },
    {
      label: "most captained",
      teamCode: mostCaptained?.team_code,
      playerName: mostCaptained ? mostCaptained.web_name : "N/A",
    },
    {
      label: "most vice-captained",
      teamCode: mostViceCaptained?.team_code,
      playerName: mostViceCaptained ? mostViceCaptained.web_name : "N/A",
    },
    {
      label: "most transferred in",
      teamCode: mostTransferredIn?.team_code,
      playerName: `${mostTransferredIn?.web_name || ""}`,
      statValue: `${mostTransferredInCount || 0} transfers in`,
    },
  ];

  const renderSummaryItem = (item: SummaryDataItem, key: number): JSX.Element => {
    const img: JSX.Element | undefined = item.teamCode ? (
      <img
        src={`${process.env.PUBLIC_URL}/assets/images/crests/${item.teamCode}.png`}
        alt={`${item.label}-crest-img`}
        height="80%"
      />
    ) : undefined;
    return (
      <Box
        key={key}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography
          data-testid={`${item.label}-label`}
          variant="h3"
          sx={{
            fontSize: "2.4vh",
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
            maxHeight: "2.5em",
          }}
        >
          {img}
          <Typography
            data-testid={`${item.label}-player-name`}
            sx={{
              fontSize: "1.8vh",
              textOverflow: "ellipsis",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {item.playerName || ""}
          </Typography>
        </Box>
        <Typography
          data-testid={`${item.label}-stat-value`}
          sx={{
            mt: 0.5,
            fontSize: "1.8vh",
            textOverflow: "ellipsis",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {item.statValue || ""}
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
