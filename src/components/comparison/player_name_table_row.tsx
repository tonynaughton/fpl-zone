import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Player } from "types";

interface PlayerNameTableRowProps {
  players: Player[];
  maxPlayerCount: number;
}

export const PlayerNameTableRow = ({ players, maxPlayerCount }: PlayerNameTableRowProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell className='first-table-cell'>
        <Typography>Name</Typography>
      </TableCell>
      { players.map((player, key) => {
        return (
          <TableCell className='standard-table-cell' key={key}>
            <Typography
              sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
            >{`${player.first_name} ${player.second_name}`}
            </Typography>
          </TableCell>
        );
      })}
      {players.length < maxPlayerCount && <TableCell className='standard-table-cell' />}
    </TableRow>
  );
};
