import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { formatDate } from "helpers";
import { AppData, CustomResult, Fixture, Team } from "types";

import { CustomModal } from "components/utils";

import { MatchStat } from "./match_stat";

interface MatchDetailsModalProps {
  isResultsModalOpen: boolean;
  setResultsModalOpen: (value: boolean) => void;
  selectedResult: Fixture;
  renderResult: (result: CustomResult, matchStarted: boolean, teams: Team[]) => JSX.Element;
}

export default function MatchDetailsModal({
  isResultsModalOpen,
  setResultsModalOpen,
  selectedResult,
  renderResult
}: MatchDetailsModalProps): JSX.Element {
  const { teams } = useContext(AppDataContext) as AppData; ;

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
        {renderResult(customResult, true, teams)}
        {statsToRender.map((stat, key) => <MatchStat key={key} selectedResult={selectedResult} statName={stat} />)}
      </Box>
    </CustomModal>
  );
}
