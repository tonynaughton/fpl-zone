import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from "@mui/material";
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

interface TableCellProps {
  testId?: string;
}

export const ComparisonTable = ({
  selectedPlayers,
  playerStats,
  onAddPlayerClick,
  onRemovePlayerClick
}: ComparisonTableProps): JSX.Element => {
  const { teams, isMobile } = useContext(AppDataContext) as AppData;
  const theme = useTheme();

  const firstCellStyle = {
    border: "1px solid rgb(96, 96, 96)",
    borderLeft: 0,
    backgroundColor: "rgb(196, 196, 196)",
    width: isMobile ? "10rem" : "15%",
    maxWidth: isMobile ? "10rem" : "15%",
    position: "sticky",
    left: 0,
    zIndex: "fab"
  };

  const standardCellStyle = {
    border: "1px solid rgb(96, 96, 96)",
    position: "relative"
  };

  const FirstCell = ({ testId, children }: React.PropsWithChildren<TableCellProps>): JSX.Element => (
    <TableCell
      component='td'
      data-testid={testId}
      sx={firstCellStyle}
    >
      {children}
    </TableCell>
  );

  const StandardCell = ({ testId, children }: React.PropsWithChildren<TableCellProps>): JSX.Element => (
    <TableCell
      className='first-cell'
      component='td'
      data-testid={testId}
      sx={standardCellStyle}
    >
      {children}
    </TableCell>
  );

  const EmptyCell = (): JSX.Element => (
    <TableCell
      component='td'
      data-testid='empty-table-cell'
      sx={standardCellStyle}
    />
  );

  return (
    <TableContainer
      sx={{
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
      }}
    >
      <Table
        aria-label='player comparison table'
        component='table'
        sx={{
          height: "100%",
          width: "100%",
          "& .MuiTableCell-root": { px: "0.8vw", py: "0.8vh" }
        }}
      >
        <TableBody component='tbody'>

          {/* Player image row */}
          <TableRow component='tr'>

            {/* Empty cell */}
            <FirstCell />

            {/* Player image cells */}
            {selectedPlayers.map((player, key) => (
              <StandardCell key={key}>
                <PlayerImageCell onButtonClick={(): void => onRemovePlayerClick(player)} player={player} />
              </StandardCell>
            ))}

            {/* Add more players cell */}
            {selectedPlayers.length < MAX_PLAYER_COUNT &&
              <StandardCell>
                <PlayerImageCell onButtonClick={onAddPlayerClick} />
              </StandardCell>}
          </TableRow>

          {/* Player name row */}
          <TableRow component='tr'>
            <FirstCell>
              <Typography className='text-ellipsis'>Name</Typography>
            </FirstCell>

            {/* Player name cells */}
            { selectedPlayers.map((player, key) => (
              <StandardCell key={key} testId={`player-name-row-${player.id}`}>
                <Typography className='text-ellipsis'>
                  {`${player.first_name} ${player.second_name}`}
                </Typography>
              </StandardCell>
            ))}
            {selectedPlayers.length < MAX_PLAYER_COUNT && <EmptyCell />}
          </TableRow>

          {/* Team name row */}
          <TableRow component='tr'>
            <FirstCell>
              <Typography className='text-ellipsis'>Team</Typography>
            </FirstCell>

            {/* Team name cells */}
            {selectedPlayers.map((player, key) => (
              <StandardCell key={key} testId={`team-name-row-${player.id}`}>
                <Typography>{getTeamById(player.team, teams).name}</Typography>
              </StandardCell>
            ))}
            {selectedPlayers.length < MAX_PLAYER_COUNT && <EmptyCell />}
          </TableRow>

          {/* Stats rows */}
          {playerStats.map((stat, key) => {
            return (
              <TableRow
                component='tr'
                data-testid={`stat-row-${stat.name}`}
                key={key}
              >
                <FirstCell testId={`stat-label-cell-${stat.name}`}>
                  <Typography className='text-ellipsis'>
                    {stat.label}
                  </Typography>
                </FirstCell>
                {selectedPlayers.map((player, key) => (
                  <StandardCell key={key} testId={`stat-value-cell-${stat.name}-${player.id}`}>
                    <Typography>{player[stat.name]}</Typography>
                  </StandardCell>
                ))}
                {selectedPlayers.length < MAX_PLAYER_COUNT && <EmptyCell />}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
