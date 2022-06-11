import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { getTeamById } from "helpers";
import { Player, Team } from "types";

import "./comparison.css";

interface TeamNameTableRowProps {
  players: Player[];
  teams: Team[];
  maxPlayerCount: number;
}

export const TeamNameTableRow = ({ players, teams, maxPlayerCount }: TeamNameTableRowProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell className='first-table-cell'>
        <Typography>Team</Typography>
      </TableCell>
      {players.map((player, key) => {
        return (
          <TableCell className='standard-table-cell' key={key}>
            <Typography>{getTeamById(player.team, teams).name}</Typography>
          </TableCell>
        );
      })}
      {players.length < maxPlayerCount && <TableCell className='standard-table-cell' />}
    </TableRow>
  );
};
