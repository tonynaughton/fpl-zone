import React from "react";
import { Box, Typography } from "@mui/material";
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
  const activeChip = teamPicks?.active_chip ? teamPicks.active_chip.toUpperCase() : "None";
  const totalPoints = teamData?.summary_event_points;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 1,
        width: "100%"
      }}
    >
      {teamData && (
        <Typography textAlign='center' variant='h2'>
          {teamData.name}
        </Typography>
      )}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          columnGap: 3,
          overflow: "hidden",
          width: "100%",
          textAlign: "center"
        }}
      >
        <Box>
          <Typography sx={{ mb: 1 }} variant='h4'>Active Chip:</Typography>
          <Typography>{activeChip}</Typography>
        </Box>
        <Box>
          <Typography sx={{ mb: 1 }} variant='h4'>GW Points:</Typography>
          <Typography>{totalPoints}</Typography>
        </Box>
        <Box>
          <Typography sx={{ mb: 1 }} variant='h4'>Overall Rank:</Typography>
          <Typography>{numberWithCommas(teamData.summary_overall_rank)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
