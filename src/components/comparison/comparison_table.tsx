import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { AppData, Player,PlayerStat, Team } from "types";

import { AddPlayerCell } from "./add_player_cell";
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
  const theme = useTheme();
  const isMaxPlayersSelected = selectedPlayers.length >= MAX_PLAYER_COUNT;

  const tableContainerStyle = {
    "&::-webkit-scrollbar": {
      width: 1
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
      border: "0.5px solid black"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      border: "0.5px solid black"
    }
  };

  const tableStyle = {
    height: "100%",
    width: "100%",
    "& .MuiTableCell-root": { p: "0.5rem" },
    tableLayout: "fixed"
  };

  const standardCellStyle = {
    border: "1px solid rgb(96, 96, 96)",
    width: "8rem",
    height: "2.5rem"
  };

  const firstCellStyle = {
    ...standardCellStyle,
    borderLeft: 0,
    backgroundColor: "rgb(196, 196, 196)",
    position: "sticky",
    left: 0,
    zIndex: "fab",
    maxWidth: "8rem"
  };

  const playerImgCellStyle = {
    ...standardCellStyle,
    position: "relative",
    height: "10rem"
  };

  const EmptyCell = (): JSX.Element => (
    <TableCell
      component='td'
      data-testid='empty-table-cell'
      sx={standardCellStyle}
    />
  );

  return (
    <TableContainer sx={tableContainerStyle}>
      <Table
        aria-label='player comparison table'
        component='table'
        sx={tableStyle}
      >
        <TableBody component='tbody'>

          {/* Player image row */}
          <TableRow component='tr'>

            {/* Empty cell */}
            <TableCell component='td' sx={firstCellStyle} />

            {/* Player image cells */}
            {selectedPlayers.map((player, key) => (
              <TableCell
                className='first-cell'
                component='td'
                data-testid={player.id}
                key={key}
                sx={playerImgCellStyle}
              >
                <PlayerImageCell onButtonClick={(): void => onRemovePlayerClick(player)} player={player} />
              </TableCell>
            ))}

            {/* Add players cell */}
            {!isMaxPlayersSelected &&
              <TableCell
                className='first-cell'
                component='td'
                data-testid='add-player-cell'
                sx={playerImgCellStyle}
              >
                <AddPlayerCell onButtonClick={onAddPlayerClick} />
              </TableCell>}
          </TableRow>

          {/* Player name row */}
          <TableRow component='tr'>
            <TableCell
              component='td'
              data-testid='player-name-row-label-cell'
              sx={firstCellStyle}
            >
              <Typography className='text-ellipsis'>Name</Typography>
            </TableCell>

            {/* Player name cells */}
            { selectedPlayers.map((player, key) => (
              <TableCell
                component='td'
                data-testid={`player-name-row-${player.id}`}
                key={key}
                sx={standardCellStyle}
              >
                <Typography className='text-ellipsis'>
                  {`${player.first_name} ${player.second_name}`}
                </Typography>
              </TableCell>
            ))}
            {!isMaxPlayersSelected && <EmptyCell />}
          </TableRow>

          {/* Team name row */}
          <TableRow component='tr'>
            <TableCell
              component='td'
              data-testid='team-name-row-label-cell'
              sx={firstCellStyle}
            >
              <Typography className='text-ellipsis'>Team</Typography>
            </TableCell>

            {/* Team name cells */}
            {selectedPlayers.map((player, key) => (
              <TableCell
                className='first-cell'
                component='td'
                data-testid={`team-name-row-${player.id}`}
                key={key}
                sx={standardCellStyle}
              >
                <Typography>{getTeamById(player.team, teams).name}</Typography>
              </TableCell>
            ))}
            {!isMaxPlayersSelected && <EmptyCell />}
          </TableRow>

          {/* Stats rows */}
          {playerStats.map((stat, key) => {
            return (
              <TableRow
                component='tr'
                data-testid={`stat-row-${stat.name}`}
                key={key}
              >
                <TableCell
                  component='td'
                  data-testid={`stat-label-cell-${stat.name}`}
                  sx={firstCellStyle}
                >
                  <Typography className='text-ellipsis'>{stat.label}</Typography>
                </TableCell>
                {selectedPlayers.map((player, key) => (
                  <TableCell
                    className='first-cell'
                    component='td'
                    data-testid={`stat-value-cell-${stat.name}-${player.id}`}
                    key={key}
                    sx={standardCellStyle}
                  >
                    <Typography>{player[stat.name]}</Typography>
                  </TableCell>
                ))}
                {!isMaxPlayersSelected && <EmptyCell />}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
