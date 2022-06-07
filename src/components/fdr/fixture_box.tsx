import React from "react";
import { Box, TableCell, Tooltip, Typography } from "@mui/material";
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
  getTeamById
}: FixtureBoxProps): JSX.Element {
  const renderBox = (fixture: Fixture, key: number): JSX.Element => {
    const teamId = isPlayerTable ? (baseItem as Player).team : (baseItem as Team).id;
    const isHome = fixture.team_h === teamId;
    const oppositionId = isHome ? fixture.team_a : fixture.team_h;
    const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;
    const testId = `fix-box-bg-${fixture.id}`;
    const text = `${getTeamById(oppositionId)} (${isHome ? "H" : "A"})`;

    return (
      <Tooltip title={text} placement='top' enterDelay={500} key={key} arrow>
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
            flexBasis: 1
          }}
          key={key}
          data-testid={testId}
        >
          <Box
            sx={{
              p: 0.2,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
          >
            <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              {text}
            </Typography>
          </Box>
        </Box>
      </Tooltip>
    );
  };

  return (
    <TableCell scope='row'>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
        data-testid='fixture-box-container'
      >
        {fixtures.map((fixture, key) => renderBox(fixture, key))}
      </Box>
    </TableCell>
  );
}
