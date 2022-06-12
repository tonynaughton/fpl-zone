import React, { useContext } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { formatDate, GetPlayerById } from "helpers";
import { AppData,CustomResult, Fixture, StatValue, Team } from "types";

import { CustomModal } from "components/utils/modal";

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
  const { playerStats, players, teams } = useContext(AppDataContext) as AppData;
  const statImageNames = {
    goals_scored: "football",
    assists: "boot",
    yellow_cards: "yellow_card",
    red_cards: "red_card"
  };

  const renderStat = (identifier: string): JSX.Element => {
    const renderStatColumn = (statValues: StatValue[], isAway = false): JSX.Element => {
      return (
        <>
          {statValues.map((stat, key) => (
            <Box
              display='flex'
              flexDirection={isAway ? "row" : "row-reverse"}
              justifyContent={isAway ? "right" : "left"}
              key={key}
              sx={{ whiteSpace: "nowrap", textOverflow: "hidden" }}
            >
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  display: "block"
                }}
              >
                {GetPlayerById(stat.element, players).web_name}
                {stat.value > 1 ? ` (${stat.value})` : ""}
              </Typography>
              &nbsp;&nbsp;
              <img
                alt={statImageNames[identifier]}
                height={20}
                src={`${process.env.PUBLIC_URL}/assets/images/${statImageNames[identifier]}.png`}
              />
            </Box>
          ))}
        </>
      );
    };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stats = selectedResult.stats.find((stat) => stat.identifier === identifier)!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const statTitle = playerStats.find((stat) => stat.name === identifier)!;
    const statsExist = stats.h.length > 0 || stats.a.length > 0;

    return statsExist
      ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            pt: 1.5
          }}
        >
          <Typography component='h4' sx={{ pb: 1 }} variant='h5'>
            {statTitle.label.toUpperCase()}
          </Typography>
          <Grid columnSpacing={2} container>
            <Grid item xs={6}>
              {renderStatColumn(stats.h)}
            </Grid>
            <Grid item xs={6}>
              {renderStatColumn(stats.a, true)}
            </Grid>
          </Grid>
        </Box>
      )
      : (
        <></>
      );
  };

  const customResult: CustomResult = {
    team_h: selectedResult.team_h,
    team_h_score: (selectedResult.team_h_score as number) || null,
    team_a: selectedResult.team_a,
    team_a_score: (selectedResult.team_a_score as number) || null,
    kickoff_time: selectedResult.kickoff_time
  };

  const kickOffTime = selectedResult.kickoff_time && formatDate(new Date(selectedResult.kickoff_time));

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
        {renderStat("goals_scored")}
        {renderStat("assists")}
        {renderStat("yellow_cards")}
        {renderStat("red_cards")}
      </Box>
    </CustomModal>
  );
}
