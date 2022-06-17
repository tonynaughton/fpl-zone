import React, { useContext } from "react";
import { TableCell, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { AppData, Player } from "types";

import { MAX_PLAYER_COUNT } from ".";

import "./comparison.css";

interface TeamNameTableRowProps {
  selectedPlayers: Player[];
}

const RenderRow = (player: Player, key: number): JSX.Element => {
  const { teams } = useContext(AppDataContext) as AppData;

  return (
    <TableCell
      className='standard-table-cell'
      data-testid={`team-name-row-${player.id}`}
      key={key}
    >
      <Typography>{getTeamById(player.team, teams).name}</Typography>
    </TableCell>
  );
};

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
