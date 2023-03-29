import React, { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { Fixture } from "types";

import { Result } from "./result";

interface ResultContainerProps {
  fixture: Fixture;
  onFixtureClick: (fixture: Fixture) => void;
}

export const ResultContainer = ({ fixture, onFixtureClick }: ResultContainerProps): JSX.Element => {
  const { teams } = useContext(AppDataContext);
  const theme = useTheme();

  const kickOff = new Date(fixture.kickoff_time || "");
  const matchStarted = kickOff < new Date();

  const onClick = matchStarted ? (): void => onFixtureClick(fixture) : undefined;
  const style = {
    minHeight: "4rem",
    height: "100%",
    p: 2,
    borderTop: "1px solid rgb(224, 224, 224)",
    "&:hover": {
      bgcolor: matchStarted ? theme.palette.highlight.main : "inherit",
      cursor: matchStarted ? "pointer" : "default"
    }
  };

  return (
    <Box
      className='flex-center'
      data-testid={`result-${fixture.id}`}
      onClick={onClick}
      sx={style}
    >
      <Result
        awayScore={fixture.team_a_score || 0}
        awayTeam={getTeamById(fixture.team_a, teams)}
        homeScore={fixture.team_h_score || 0}
        homeTeam={getTeamById(fixture.team_h, teams)}
        kickOff={kickOff}
      />
    </Box>
  );
};
