import React from "react";
import { TableCell, Typography } from "@mui/material";
import { useTeamById } from "hooks/use_team_by_id";
import { Player } from "types";

import { MAX_PLAYER_COUNT } from ".";

import "./comparison.css";

interface TeamNameTableRowProps {
  selectedPlayers: Player[];
}

const RenderRow = (player: Player, key: number): JSX.Element => (
  <TableCell
    className='standard-table-cell'
    data-testid={`team-name-row-${player.id}`}
    key={key}
  >
    <Typography>{useTeamById(player.team).name}</Typography>
  </TableCell>
);

export const TeamNameTableRow = ({ selectedPlayers }: TeamNameTableRowProps): JSX.Element => {
  return (
    <>
      <TableCell className='first-table-cell'>
        <Typography>Team</Typography>
      </TableCell>
      {selectedPlayers.map(RenderRow)}
      {selectedPlayers.length < MAX_PLAYER_COUNT &&
        <TableCell
          className='standard-table-cell'
          data-testid='empty-table-cell'
        />}
    </>
  );
};
