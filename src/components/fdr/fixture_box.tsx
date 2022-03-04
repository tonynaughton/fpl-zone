import { Box, TableCell } from "@mui/material";
import React from "react";
import { Fixture, Player, Team } from "types";

interface FixtureBoxProps {
  fixtures: Fixture[];
  baseItem: Player | Team;
  isPlayerTable: boolean;
  getTeamById: (teamId: number) => string | undefined;
}

export default function FixtureBox({
  fixtures,
  baseItem,
  isPlayerTable,
  getTeamById,
}: FixtureBoxProps): JSX.Element {
  const fdrColours = {
    1: "#09BA59",
    2: "#93E02D",
    3: "#F5CF38",
    4: "#DE7628",
    5: "#FF193C",
  };

  const renderBox = (fixture: Fixture, key: number): JSX.Element => {
    const teamId = isPlayerTable ? (baseItem as Player).team : (baseItem as Team).id;
    const isHome = fixture.team_h === teamId;
    const oppositionId = isHome ? fixture.team_a : fixture.team_h;
    const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;

    return (
      <Box
        sx={{
          backgroundColor: `${fdrColours[difficulty]}`,
          p: 0.5,
          flexGrow: 1,
          textAlign: "center",
        }}
        key={key}
      >
        {getTeamById(oppositionId)} ({isHome ? "H" : "A"})
      </Box>
    );
  };

  return (
    <TableCell scope="row">
      <Box display="flex" sx={{ width: "100%" }}>
        {fixtures.map((fixture, key) => renderBox(fixture, key))}
      </Box>
    </TableCell>
  );
}
