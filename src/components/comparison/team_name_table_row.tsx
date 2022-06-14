import React, { Fragment } from "react";
import { TableCell, Typography } from "@mui/material";
import { getTeamById } from "helpers";
import { Player, Team } from "types";

import { MAX_PLAYER_COUNT } from ".";

import "./comparison.css";

interface TeamNameTableRowProps {
  selectedPlayers: Player[];
  teams: Team[];
}

export const TeamNameTableRow = ({ selectedPlayers, teams }: TeamNameTableRowProps): JSX.Element => {
  return (
    <>
      <TableCell className='first-table-cell'>
        <Typography>Team</Typography>
      </TableCell>
      {selectedPlayers.map((player, key) => {
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
      {selectedPlayers.length < MAX_PLAYER_COUNT &&
        <TableCell
          className='standard-table-cell'
          data-testid='empty-table-cell'
        />}
    </>
  );
};
