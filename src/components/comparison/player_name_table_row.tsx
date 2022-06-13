import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Player } from "types";

import { MAX_PLAYER_COUNT } from ".";

interface PlayerNameTableRowProps {
  players: Player[];
}

export const PlayerNameTableRow = ({ players }: PlayerNameTableRowProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell className='first-table-cell'>
        <Typography>Name</Typography>
      </TableCell>
      { players.map((player, key) => {
        return (
          <TableCell
            className='standard-table-cell'
            data-testid={`player-name-row-${player.id}`}
            key={key}
          >
            <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
              {`${player.first_name} ${player.second_name}`}
            </Typography>
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
