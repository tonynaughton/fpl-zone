import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { numberWithCommas } from "helpers";
import { TeamData, TeamPicks } from "types";

interface LineupDetailsProps {
  teamData: TeamData;
  teamPicks: TeamPicks;
}

export const LineupDetails = ({
  teamData,
  teamPicks
}: LineupDetailsProps): JSX.Element => {
  const { isMobile } = useContext(AppDataContext);
  const activeChip = teamPicks?.active_chip ? teamPicks.active_chip.toUpperCase() : "None";
  const totalPoints = teamData?.summary_event_points;

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={isMobile ? 0 : 1}
      width='100%'
    >
      {teamData && (
        <Typography data-testid='team-name' textAlign='center' variant='h4'>
          {teamData.name}
        </Typography>
      )}
      <Box
        alignItems='center'
        display='flex'
        gap={5}
        justifyContent='space-evenly'
        overflow='hidden'
        padding={2}
        textAlign='center'
        width='100%'
      >
        <Box>
          <Typography marginBottom={1} variant='h5'>Active Chip:</Typography>
          <Typography data-testid='active-chip'>{activeChip}</Typography>
        </Box>
        <Box>
          <Typography marginBottom={1} variant='h5'>GW Points:</Typography>
          <Typography data-testid='total-points'>{totalPoints}</Typography>
        </Box>
        <Box>
          <Typography marginBottom={1} variant='h5'>Overall Rank:</Typography>
          <Typography data-testid='overall-rank'>{numberWithCommas(teamData.summary_overall_rank)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
