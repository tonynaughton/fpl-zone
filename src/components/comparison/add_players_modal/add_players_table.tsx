import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Player } from "types";

import { MAX_PLAYER_COUNT } from "..";

import { AddPlayersTableRow } from "./add_players_table_row";

interface AddPlayersTableProps {
  displayedPlayers: Player[];
  onPlayerToggle: (player: Player, value: boolean) => void;
  tempSelectedPlayers: Player[];
}

export const AddPlayersTable = ({
  displayedPlayers,
  onPlayerToggle,
  tempSelectedPlayers
}: AddPlayersTableProps): JSX.Element => {
  return (
    <Table stickyHeader sx={{ tableLayout: "fixed" }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ pl: 2 }}>
            <Typography
              color={tempSelectedPlayers.length >= MAX_PLAYER_COUNT ? "red" : "black"}
              data-testid='selected-player-count'
              fontWeight='600'
            >
              {tempSelectedPlayers.length}/{MAX_PLAYER_COUNT}
            </Typography>
          </TableCell>
          <TableCell><Typography>Name</Typography></TableCell>
          <TableCell><Typography>Team</Typography></TableCell>
          <TableCell><Typography>Position</Typography></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayedPlayers.map((player, key) => (
          <AddPlayersTableRow
            key={key}
            onPlayerToggle={onPlayerToggle}
            player={player}
            tempSelectedPlayers={tempSelectedPlayers}
          />
        ))}
      </TableBody>
    </Table>
  );
};
