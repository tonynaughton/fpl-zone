import React, { Fragment } from "react";
import { Box } from "@mui/material";

import { useSummaryStats } from "./helpers/use_summary_stats";
import { SummaryStat } from "./summary_stat";

export interface SummaryStatType {
  label: string;
  teamCode?: number;
  playerName?: string;
  value?: string | number;
}

export default function GameweekSummary(): JSX.Element {
  const summaryData = useSummaryStats();

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
