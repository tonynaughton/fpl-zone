import React from "react";
import { Box } from "@mui/material";
import { useGameStatus } from "hooks/use_game_status";

import { Notifier, notifierMessageMap as msgMap } from "components/layout";

import { useSummaryStats } from "../../hooks/use_summary_stats";

import { SummaryStat } from "./summary_stat";

export interface SummaryStatType {
  label: string;
  teamCode?: number;
  playerName?: string;
  value?: string | number;
}

export default function GameweekSummary(): JSX.Element {
  const { seasonNotStarted, gameUpdating } = useGameStatus();
  const summaryData = useSummaryStats();

  if (seasonNotStarted) {
    return <Notifier message={msgMap.seasonNotStarted} type='warning' />;
  }

  if (gameUpdating) {
    return <Notifier message={msgMap.gameUpdating} type='warning' />;
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100%'
      justifyContent='space-between'
      pb={4}
      pt={8}
      px={4}
    >
      {summaryData.map((stat, key): JSX.Element => <SummaryStat key={key} stat={stat} />)}
    </Box>
  );
}
