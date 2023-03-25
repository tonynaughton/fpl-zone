import React from "react";
import { Box, Typography } from "@mui/material";
import { formatNumber } from "helpers";

export interface TeamStats {
  activeChip: string;
  totalPoints: number;
  overallRank: number;
}

interface LineupDetailsProps {
  teamName: string;
  teamStats?: TeamStats;
}

export const LineupDetails = ({
  teamName,
  teamStats
}: LineupDetailsProps): JSX.Element => {

  const TeamStats = (): JSX.Element => {
    if (!teamStats) {
      return <></>;
    }

    const { activeChip, totalPoints, overallRank } = teamStats;

    return (
      <Box
        alignItems='center'
        display='flex'
        justifyContent='space-evenly'
        overflow='hidden'
        textAlign='center'
        width='100%'
      >
        <Box>
          <Typography>Active Chip:</Typography>
          <Typography data-testid='active-chip'>{activeChip}</Typography>
        </Box>
        <Box>
          <Typography>GW Points:</Typography>
          <Typography data-testid='total-points'>{totalPoints}</Typography>
        </Box>
        <Box>
          <Typography>Overall Rank:</Typography>
          <Typography data-testid='overall-rank'>{formatNumber(overallRank)}</Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={1}
      width='100%'
    >
      <Typography data-testid='team-name' textAlign='center' variant='h4'>
        {teamName}
      </Typography>
      <TeamStats />
    </Box>
  );
};
