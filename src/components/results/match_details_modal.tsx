import React, { useContext } from "react";
import { Close } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { formatDate, GetPlayerById } from "helpers";
import { AppData,CustomResult, Fixture, StatValue, Team } from "types";

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
  const appData = useContext(AppDataContext) as AppData;
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
              justifyContent={isAway ? "right" : "left"}
              flexDirection={isAway ? "row" : "row-reverse"}
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
                {GetPlayerById(stat.element, appData.elements).web_name}
                {stat.value > 1 ? ` (${stat.value})` : ""}
              </Typography>
              &nbsp;&nbsp;
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/${statImageNames[identifier]}.png`}
                alt={statImageNames[identifier]}
                height={20}
              />
            </Box>
          ))}
        </>
      );
    };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const stats = selectedResult.stats.find((stat) => stat.identifier === identifier)!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const statTitle = appData.element_stats.find((stat) => stat.name === identifier)!;
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
          <Typography component='h4' variant='h5' sx={{ pb: 1 }}>
            {statTitle.label.toUpperCase()}
          </Typography>
          <Grid container columnSpacing={2}>
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

  return (
    <Box
      sx={{
        display: isResultsModalOpen ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(0, 0, 0, 0.5)"
      }}
      onClick={(): void => setResultsModalOpen(false)}
    >
      <Box
        sx={{
          display: isResultsModalOpen ? "flex" : "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          flexDirection: "column",
          alignItems: "center",
          rowGap: 1,
          zIndex: 2000
        }}
        // https://stackoverflow.com/questions/49637047/prevent-onclick-from-firing-if-another-element-is-on-top
        onClick={(event): void => event.stopPropagation()}
      >
        <IconButton
          onClick={(): void => setResultsModalOpen(false)}
          sx={{ position: "absolute", top: "12px", right: "12px" }}
        >
          <Close />
        </IconButton>
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
          <Typography variant='h5'>
            {selectedResult.kickoff_time && formatDate(new Date(selectedResult.kickoff_time))}
          </Typography>
          {renderResult(customResult, true, appData.teams)}
          {renderStat("goals_scored")}
          {renderStat("assists")}
          {renderStat("yellow_cards")}
          {renderStat("red_cards")}
        </Box>
      </Box>
    </Box>
  );
}
