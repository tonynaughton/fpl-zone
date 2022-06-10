import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Player } from "types";

import { customCellStyle } from "./comparison_table";

interface PlayerNameRowProps {
  players: Player[];
}

export const NameRow = ({ players }: PlayerNameRowProps): JSX.Element => {
  return (
    <TableRow>
      <TableCell sx={customCellStyle}>
        <Typography>Name</Typography>
      </TableCell>
      {players.map((player, key) => {
        return (
          <TableCell
            key={key}
            sx={customCellStyle}
          >
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
