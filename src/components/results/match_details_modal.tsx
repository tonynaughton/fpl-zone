import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Fixture, Goalscorer, Player } from "types";
import { Close } from "@mui/icons-material";
import { formatDate, GetPlayerById } from "helpers";

interface MatchDetailsModalProps {
  isResultsModalOpen: boolean;
  setResultsModalOpen: (value: boolean) => void;
  selectedResult: Fixture;
  renderResult: (result: Fixture, matchStarted: boolean) => JSX.Element;
  players: Player[];
}

export default function MatchDetailsModal({
  isResultsModalOpen,
  setResultsModalOpen,
  selectedResult,
  renderResult,
  players,
}: MatchDetailsModalProps): JSX.Element {
  const renderGoalscorers = (goalscorers: Goalscorer[], isAway = false): JSX.Element => {
    return (
      <>
        {goalscorers.map((goalscorer, key) => (
          <Box
            display="flex"
            justifyContent={isAway ? "right" : "left"}
            flexDirection={isAway ? "row" : "row-reverse"}
            key={key}
          >
            <Typography>
              {GetPlayerById(goalscorer.element, players).web_name}
              {goalscorer.value > 1 ? ` (${goalscorer.value})` : ""}
            </Typography>
            &nbsp;&nbsp;
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/football.png`}
              alt="football"
              height={20}
              width={20}
            />
          </Box>
        ))}
      </>
    );
  };

  const goalsScored = selectedResult?.stats.find((stat) => stat.identifier === "goals_scored");
  return (
    <Box
      sx={{
        display: isResultsModalOpen ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(0, 0, 0, 0.5)",
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
          rowGap: "1em",
          zIndex: 2000,
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
        {selectedResult.kickoff_time && (
          <Typography>{formatDate(new Date(selectedResult.kickoff_time))}</Typography>
        )}
        {renderResult(selectedResult, true)}
        {goalsScored && (
          <Grid container sx={{ pt: 2, borderTop: "1px solid gray" }}>
            <Grid item xs={6}>
              {renderGoalscorers(goalsScored.h)}
            </Grid>
            <Grid item xs={6}>
              {renderGoalscorers(goalsScored.a, true)}
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
