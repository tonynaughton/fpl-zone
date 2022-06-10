import React from "react";
import { Box,TableCell, TableRow, Typography } from "@mui/material";
import { getTeamById } from "helpers";
import { Player, Team } from "types";

import { customCellStyle } from "./comparison_table";

interface TeamRowProps {
  players: Player[];
  teams: Team[];
}

export const TeamRow = ({ players, teams }: TeamRowProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell sx={customCellStyle}>
        <Typography>Team</Typography>
      </TableCell>
      {players.map((player, key) => {
        return (
          <TableCell key={key}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                columnGap: 1
              }}
            >
              <img
                alt='team-crest'
                height='25px'
                src={`${process.env.PUBLIC_URL}/assets/images/crests/${player.team_code}.png`}
              />
              {getTeamById(player.team, teams).name}
            </Box>
          </TableCell>
        );
      })}
    </TableRow>
  );
};
