import React, { Fragment, useContext } from "react";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import { GetPlayerById, numberWithCommas } from "helpers";
import { AppData } from "types";
import { Gameweek } from "types/gameweek";

import { SummaryStat } from "./summary_stat";
import { SummaryStatType } from "./types";

export default function GameweekSummary(): JSX.Element {
  const { gameweeks, players } = useContext(AppDataContext) as AppData;

  const gameweek = gameweeks.find((gw) => gw.is_current) as Gameweek;
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

  const summaryData: SummaryStatType[] = [
    {
      label: "highest score",
      value: `${gameweek?.highest_score || 0} pts`
    },
    { label: "average score", value: `${gameweek?.average_entry_score} pts` || 0 },
    {
      label: "star player",
      teamCode: starPlayer?.team_code,
      playerName: starPlayer?.web_name || "",
      value: `${gameweek?.top_element_info?.points} pts` || 0
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
      value: mostTransferredInCount
    }
  ];

  return (
    <Box
      sx={{
        pl: 4,
        pr: 4,
        pt: 8,
        pb: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
      }}
    >
      {summaryData.map((stat, index): JSX.Element => {
        return (
          <Fragment key={index}>
            <SummaryStat stat={stat} />
          </Fragment>
        );
      })}
    </Box>
  );
}
