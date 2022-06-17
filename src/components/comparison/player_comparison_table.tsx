import React from "react";
import { Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { Player,PlayerStat, Team } from "types";

import { MAX_PLAYER_COUNT, PlayerImageTableRow, PlayerNameTableRow, TeamNameTableRow } from ".";

interface PlayerComparisonTableProps {
  selectedPlayers: Player[];
  teams: Team[];
  playerStats: PlayerStat[];
  onAddPlayerClick: () => void;
  onRemovePlayerClick: (player: Player) => void;
}

export const PlayerComparisonTable = ({
  selectedPlayers,
  playerStats,
  onAddPlayerClick,
  onRemovePlayerClick
}: PlayerComparisonTableProps): JSX.Element => {

  return (
    <Table
      aria-label='player comparison table'
      component='table'
      sx={{
        tableLayout: "fixed",
        flexGrow: "1",
        height: "100%"
      }}
    >
      <TableBody component='tbody'>
        <TableRow component='tr'>
          <PlayerImageTableRow
            onAddPlayerClick={onAddPlayerClick}
            onRemovePlayerClick={onRemovePlayerClick}
            selectedPlayers={selectedPlayers}
          />
        </TableRow>
        <TableRow component='tr'>
          <PlayerNameTableRow selectedPlayers={selectedPlayers} />
        </TableRow>
        <TableRow component='tr'>
          <TeamNameTableRow selectedPlayers={selectedPlayers} />
        </TableRow>
        {playerStats.map((stat, key) => {
          return (
            <TableRow
              data-testid={`stat-row-${stat.name}`}
              key={key}
            >
              <TableCell
                className='first-table-cell'
                data-testid={`stat-label-cell-${stat.name}`}
              >
                <Typography
                  sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                >
                  {stat.label}
                </Typography>
              </TableCell>
              {selectedPlayers.map((player, key) => {
                return (
                  <TableCell
                    className='standard-table-cell'
                    data-testid={`stat-value-cell-${stat.name}-${player.id}`}
                    key={key}
                  >
                    <Typography>{player[stat.name]}</Typography>
                  </TableCell>
                );
              })}
              {selectedPlayers.length < MAX_PLAYER_COUNT &&
                <TableCell
                  className='standard-table-cell'
                  data-testid={`empty-table-cell=${stat.name}`}
                />}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
