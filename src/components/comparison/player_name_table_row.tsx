import React, { Fragment } from "react";
import { TableCell, Typography } from "@mui/material";
import { Player } from "types";

import { MAX_PLAYER_COUNT } from ".";

interface PlayerNameTableRowProps {
  selectedPlayers: Player[];
}

export const PlayerNameTableRow = ({ selectedPlayers }: PlayerNameTableRowProps): JSX.Element => {
  return (
    <>
      <TableCell className='first-table-cell'>
        <Typography>Name</Typography>
      </TableCell>
      { selectedPlayers.map((player, key) => {
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
      {selectedPlayers.length < MAX_PLAYER_COUNT &&
        <TableCell
          className='standard-table-cell'
          data-testid='empty-table-cell'
        />}
    </>
  );
};
