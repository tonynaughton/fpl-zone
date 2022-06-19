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
      className='flex-center'
      flexDirection='column'
      gap={1}
      minWidth={0}
      overflow='hidden'
      width='100%'
    >
      <Typography
        className='text-ellipsis'
        data-testid={`stat-label-text-${stat.label}`}
        minWidth={0}
        textAlign='center'
        variant='h3'
        width='100%'
      >
        {stat.label.toUpperCase()}
      </Typography>
      <Box
        className='flex-center'
        gap={1}
        minWidth={0}
        overflow='hidden'
        width='100%'
      >
        {img}
        <Typography className='text-ellipsis' data-testid={`stat-value-text-${stat.label}`} textAlign='center'>
          {statValue}
        </Typography>
      </Box>
    </Box>
  );
};
