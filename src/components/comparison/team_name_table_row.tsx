import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { getTeamById } from "helpers";
import { Player, Team } from "types";

import { MAX_PLAYER_COUNT } from ".";

import "./comparison.css";

interface TeamNameTableRowProps {
  players: Player[];
  teams: Team[];
}

export const TeamNameTableRow = ({ players, teams }: TeamNameTableRowProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell className='first-table-cell'>
        <Typography>Team</Typography>
      </TableCell>
      {players.map((player, key) => {
        return (
          <TableCell
            className='standard-table-cell'
            data-testid={`team-name-row-${player.id}`}
            key={key}
          >
            <Typography>{getTeamById(player.team, teams).name}</Typography>
          </TableCell>
        );
      })}
      {players.length < MAX_PLAYER_COUNT &&
        <TableCell
          className='standard-table-cell'
          data-testid='empty-table-cell'
        />}
    </TableRow>
  );
};
