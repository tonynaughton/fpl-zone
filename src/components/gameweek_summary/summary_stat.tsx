import React from "react";
import { Box, Typography } from "@mui/material";
import { getLocalImage } from "helpers";

import { SummaryStatType } from "./gameweek_summary";


interface SummaryStatProps {
  stat: SummaryStatType;
}

export const SummaryStat = ({ stat }: SummaryStatProps): JSX.Element => {
  const img: JSX.Element | null = stat.teamCode
    ? (
      <img
        alt='team-crest-img'
        data-testid={`team-crest-img-${stat.label}`}
        height='auto'
        src={getLocalImage(`crests/${stat.teamCode}.png`)}
        width='15%'
      />
    )
    : null;

  const statValue = `
    ${stat.playerName || ""}
    ${stat.playerName && stat.value ? " - " : ""}
    ${stat.value || ""}
  `;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: 1
      }}
    >
      <Typography
        data-testid={`stat-label-text-${stat.label}`}
        sx={{
          width: "100%",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textAlign: "center"
        }}
        variant='h3'
      >
        {stat.label.toUpperCase()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: 1,
          maxWidth: "100%"
        }}
      >
        {img}
        <Typography
          data-testid={`stat-value-text-${stat.label}`}
          sx={{
            textOverflow: "ellipsis",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden"
          }}
        >
          {statValue}
        </Typography>
      </Box>
    </Box>
  );
};
