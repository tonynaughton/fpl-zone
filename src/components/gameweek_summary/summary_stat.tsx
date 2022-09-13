import React from "react";
import { Box, Typography } from "@mui/material";
import { getTeamCrestImageUrl } from "helpers";

import { SummaryStatType } from "./gameweek_summary";

import "./summary_stat.css";

interface SummaryStatProps {
  stat: SummaryStatType;
}

export const SummaryStat = ({ stat }: SummaryStatProps): JSX.Element => {
  const img: JSX.Element | null = stat.teamCode
    ? (
      <img
        alt='team-crest-img'
        className='team-crest-img'
        data-testid={`team-crest-img-${stat.label}`}
        src={getTeamCrestImageUrl(stat.teamCode)}
      />
    )
    : null;

  return (
    <Box
      className='flex-center'
      flexDirection='column'
      height='100%'
      minHeight={0}
    >
      <Typography
        className='text-ellipsis'
        data-testid={`stat-label-text-${stat.label}`}
        textAlign='center'
        variant='h5'
        width='100%'
      >
        {stat.label.toUpperCase()}
      </Typography>
      <Box
        className='flex-center'
        gap={1}
        height='100%'
        overflow='hidden'
        width='100%'
      >
        {img}
        <Typography className='text-ellipsis' data-testid={`stat-value-text-${stat.label}`} textAlign='center'>
          {stat.playerName?.toUpperCase() || ""}
          {stat.playerName?.toUpperCase() && stat.value ? " - " : ""}
          {stat.value || ""}
        </Typography>
      </Box>
    </Box>
  );
};
