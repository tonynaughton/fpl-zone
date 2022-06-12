import React from "react";
import { Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { Player,PlayerStat, Team } from "types";

import { MAX_PLAYER_COUNT, PlayerImageTableRow, PlayerNameTableRow, TeamNameTableRow } from ".";

interface ComparisonTableProps {
  selectedPlayers: Player[];
  teams: Team[];
  playerStats: PlayerStat[];
  onAddPlayerClick: () => void;
  onRemovePlayerClick: (player: Player) => void;
}

export const ComparisonTable = ({
  selectedPlayers,
  teams,
  playerStats,
  onAddPlayerClick,
  onRemovePlayerClick
}: ComparisonTableProps): JSX.Element => {

  return (
    <Table
      aria-label='player comparison table'
      sx={{
        tableLayout: "fixed",
        flexGrow: "1",
        height: "100%"
      }}
    >
      <TableBody>
        <PlayerImageTableRow
          onAddPlayerClick={onAddPlayerClick}
          onRemovePlayerClick={onRemovePlayerClick}
          players={selectedPlayers}
        />
        <PlayerNameTableRow players={selectedPlayers} />
        <TeamNameTableRow players={selectedPlayers} teams={teams} />
        {playerStats.map((stat, key) => {
          return (
            <TableRow key={key}>
              <TableCell className='first-table-cell'>
                <Typography
                  sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                >
                  {stat.label}
                </Typography>
              </TableCell>
              {selectedPlayers.map((player, key) => {
                return (
                  <TableCell className='standard-table-cell' key={key}>
                    <Typography>{player[stat.name]}</Typography>
                  </TableCell>
                );
              })}
              {selectedPlayers.length < MAX_PLAYER_COUNT && <TableCell className='standard-table-cell' />}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
