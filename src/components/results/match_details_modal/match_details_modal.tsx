import React from "react";
import { Box, Typography } from "@mui/material";
import { formatDate } from "helpers";
import { CustomResult, Fixture } from "types";

import { CustomModal } from "components/utils";

import { Result } from "../result";

import { MatchStat } from "./match_stat";

interface MatchDetailsModalProps {
  isResultsModalOpen: boolean;
  setResultsModalOpen: (value: boolean) => void;
  selectedResult: Fixture;
}

export default function MatchDetailsModal({
  isResultsModalOpen,
  setResultsModalOpen,
  selectedResult
}: MatchDetailsModalProps): JSX.Element {
  const customResult: CustomResult = {
    team_h: selectedResult.team_h,
    team_h_score: (selectedResult.team_h_score as number) || null,
    team_a: selectedResult.team_a,
    team_a_score: (selectedResult.team_a_score as number) || null,
    kickoff_time: selectedResult.kickoff_time
  };

  const kickOffTime = selectedResult.kickoff_time && formatDate(new Date(selectedResult.kickoff_time));

  const statsToRender = [
    "goals_scored",
    "assists",
    "yellow_cards",
    "red_cards"
  ];

  return (
    <CustomModal
      isModalOpen={isResultsModalOpen}
      setModalOpen={setResultsModalOpen}
    >
      <Box
        className='flex-center'
        flexDirection='column'
        gap={2}
        width='100%'
      >
        {kickOffTime && <Typography variant='h5'>{kickOffTime}</Typography>}
        <Result result={customResult} started />
        {statsToRender.map((stat, key) => <MatchStat key={key} selectedResult={selectedResult} statName={stat} />)}
      </Box>
    </CustomModal>
  );
}
