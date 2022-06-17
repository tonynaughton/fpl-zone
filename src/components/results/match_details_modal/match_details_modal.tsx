import React from "react";
import { Box, Typography } from "@mui/material";
import { formatDate } from "helpers";
import { CustomResult, Fixture } from "types";

import { CustomModal } from "components/utils";

import { MatchStat } from "./match_stat";

interface MatchDetailsModalProps {
  isResultsModalOpen: boolean;
  setResultsModalOpen: (value: boolean) => void;
  selectedResult: Fixture;
  renderResult: (result: CustomResult, matchStarted: boolean) => JSX.Element;
}

export default function MatchDetailsModal({
  isResultsModalOpen,
  setResultsModalOpen,
  selectedResult,
  renderResult
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
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          rowGap: 2
        }}
      >
        {kickOffTime && <Typography variant='h5'>{kickOffTime}</Typography>}
        {renderResult(customResult, true)}
        {statsToRender.map((stat, key) => <MatchStat key={key} selectedResult={selectedResult} statName={stat} />)}
      </Box>
    </CustomModal>
  );
}
