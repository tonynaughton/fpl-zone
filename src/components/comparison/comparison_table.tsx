import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { AppData, Player,PlayerStat, Team } from "types";

import { MAX_PLAYER_COUNT, PlayerImageCell } from ".";

interface ComparisonTableProps {
  selectedPlayers: Player[];
  teams: Team[];
  playerStats: PlayerStat[];
  onAddPlayerClick: () => void;
  onRemovePlayerClick: (player: Player) => void;
}

export const ComparisonTable = ({
  selectedPlayers,
  playerStats,
  onAddPlayerClick,
  onRemovePlayerClick
}: ComparisonTableProps): JSX.Element => {
  const { teams } = useContext(AppDataContext) as AppData;

  return (
    <Table
      aria-label='player comparison table'
      component='table'
      sx={{
        tableLayout: "fixed",
        flexGrow: "1",
        height: "100%",
        "& .MuiTableCell-root": {
          pl: "0.8vw", pr: "0.8vw", pt: "1vh", pb: "1vh"
        }
      }}
    >
      <TableBody component='tbody'>
        <TableRow component='tr'>
          <TableCell className='first-table-cell' component='td' />
          {selectedPlayers.map((player, key) => (
            <TableCell className='standard-table-cell' component='td' key={key}>
              <PlayerImageCell onButtonClick={(): void => onRemovePlayerClick(player)} player={player} />
            </TableCell>
          ))}
          {selectedPlayers.length < MAX_PLAYER_COUNT &&
            <TableCell className='standard-table-cell' component='td'>
              <PlayerImageCell onButtonClick={onAddPlayerClick} />
            </TableCell>}
        </TableRow>
        <TableRow component='tr'>
          <TableCell className='first-table-cell' component='td'>
            <Typography>Name</Typography>
          </TableCell>
          { selectedPlayers.map((player, key) => (
            <TableCell
              className='standard-table-cell'
              component='td'
              data-testid={`player-name-row-${player.id}`}
              key={key}
            >
              <Typography className='text-ellipsis'>
                {`${player.first_name} ${player.second_name}`}
              </Typography>
            </TableCell>
          ))}
          {selectedPlayers.length < MAX_PLAYER_COUNT &&
            <TableCell
              className='standard-table-cell'
              component='td'
              data-testid='empty-table-cell'
            />}
        </TableRow>
        <TableRow component='tr'>
          <TableCell className='first-table-cell' component='td'>
            <Typography>Team</Typography>
          </TableCell>
          {selectedPlayers.map((player, key) => (
            <TableCell
              className='standard-table-cell'
              component='td'
              data-testid={`team-name-row-${player.id}`}
              key={key}
            >
              <Typography>{getTeamById(player.team, teams).name}</Typography>
            </TableCell>
          ))}
          {selectedPlayers.length < MAX_PLAYER_COUNT &&
            <TableCell
              className='standard-table-cell'
              component='td'
              data-testid='empty-table-cell'
            />}
        </TableRow>
        {playerStats.map((stat, key) => {
          return (
            <TableRow
              component='tr'
              data-testid={`stat-row-${stat.name}`}
              key={key}
            >
              <TableCell
                className='first-table-cell'
                component='td'
                data-testid={`stat-label-cell-${stat.name}`}
              >
                <Typography className='text-ellipsis'>
                  {stat.label}
                </Typography>
              </TableCell>
              {selectedPlayers.map((player, key) => {
                return (
                  <TableCell
                    className='standard-table-cell'
                    component='td'
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
                  component='td'
                  data-testid={`empty-table-cell=${stat.name}`}
                />}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
