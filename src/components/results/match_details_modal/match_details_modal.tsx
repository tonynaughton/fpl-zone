import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getFormattedDate, getFormattedTime, getTeamById } from "helpers";
import { Fixture } from "types";

import { CustomModal } from "components/utils";

import { Result } from "../result";

import { MatchStat } from "./match_stat";

interface MatchDetailsModalProps {
  isFixtureDetailsModalOpen: boolean;
  closeFixtureDetailsModal: () => void;
  fixture: Fixture;
}

export default function MatchDetailsModal({
  isFixtureDetailsModalOpen: isResultsModalOpen,
  closeFixtureDetailsModal: closeResultsModal,
  fixture
}: MatchDetailsModalProps): JSX.Element {
  const { teams } = useContext(AppDataContext);

  const homeTeam = getTeamById(fixture.team_h, teams);
  const awayTeam = getTeamById(fixture.team_a, teams);

  const homeScore = fixture.team_h_score || 0;
  const awayScore = fixture.team_a_score || 0;

  const kickOff = new Date(fixture.kickoff_time || "");

  const kickOffTime = fixture.kickoff_time && (
    <Box className='flex-center' flexDirection='column'>
      <Typography>{getFormattedDate(kickOff)}</Typography>
      <Typography>{getFormattedTime(kickOff)}</Typography>
    </Box>
  );

  const statsToRender = [
    "goals_scored",
    "assists",
    "yellow_cards",
    "red_cards"
  ];

  return (
    <CustomModal
      closeModal={closeResultsModal}
      isModalOpen={isResultsModalOpen}
    >
      <Box
        className='flex-center'
        flexDirection='column'
        gap={2}
        width='100%'
      >
        {kickOffTime}
        <Result
          awayScore={awayScore}
          awayTeam={awayTeam}
          homeScore={homeScore}
          homeTeam={homeTeam}
          kickOff={kickOff}
        />
        {statsToRender.map((stat, key) => <MatchStat key={key} selectedResult={fixture} statName={stat} />)}
      </Box>
    </CustomModal>
  );
}
