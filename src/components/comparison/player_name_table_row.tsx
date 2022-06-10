import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Player } from "types";

interface PlayerNameTableRowProps {
  players: Player[];
}

export const PlayerNameTableRow = ({ players }: PlayerNameTableRowProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell className='first-table-cell'>
        <Typography>Name</Typography>
      </TableCell>
      {players.map((player, key) => {
        return (
          <TableCell className='standard-table-cell' key={key}>
            <Typography
              sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
            >{`${player.first_name} ${player.second_name}`}
            </Typography>
          </TableCell>
        );
      })}
    </TableRow>
  );
};
