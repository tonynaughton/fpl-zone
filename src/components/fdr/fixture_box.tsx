import React from "react";
import { Box, TableCell, Typography } from "@mui/material";
import { Fixture, Player, Team } from "types";
import { fdrColours } from "./difficulty_legend";
import { BaseItem } from "./fdr";

interface FixtureBoxProps {
  fixtures: Fixture[];
  baseItem: BaseItem;
  isPlayerTable: boolean;
  getTeamById: (teamId: number) => string | undefined;
}

export default function FixtureBox({
  fixtures,
  baseItem,
  isPlayerTable,
  getTeamById,
}: FixtureBoxProps): JSX.Element {
  const renderBox = (fixture: Fixture, key: number): JSX.Element => {
    const teamId = isPlayerTable ? (baseItem as Player).team : (baseItem as Team).id;
    const isHome = fixture.team_h === teamId;
    const oppositionId = isHome ? fixture.team_a : fixture.team_h;
    const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;
    const testId = `fix-box-bg-${fixture.id}`;

    return (
      <Box
        sx={{
          p: 0.5,
          display: "flex",
          backgroundColor: `${fdrColours[difficulty]}`,
          height: "100%",
          flexGrow: 1,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
        key={key}
        data-testid={testId}
      >
        <Box
          sx={{
            p: 0.2,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          <Typography fontSize={14}>
            {getTeamById(oppositionId)} ({isHome ? "H" : "A"})
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <TableCell scope="row">
      <Box
        display="flex"
        sx={{ width: "100%", height: "100%", alignItems: "center" }}
        data-testid="fixture-box-container"
      >
        {fixtures.map((fixture, key) => renderBox(fixture, key))}
      </Box>
    </TableCell>
  );
}
