import React from "react";
import { Box,Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { getPositionById,getTeamById } from "helpers";
import { Player, Position, Team } from "types";

import { ControlledCheckbox } from "components/utils";

import { MAX_PLAYER_COUNT } from "..";

interface AddPlayersTableProps {
  displayedPlayers: Player[];
  onPlayerToggle: (player: Player, value: boolean) => void;
  tempSelectedPlayers: Player[];
  teams: Team[];
  positions: Position[];
}

export const AddPlayersTable = ({
  displayedPlayers,
  onPlayerToggle,
  tempSelectedPlayers,
  teams,
  positions
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
        {displayedPlayers.map((player, index) => {
          const team = getTeamById(player.team, teams);
          const position = getPositionById(player.element_type, positions);
          const checkedValue = tempSelectedPlayers.includes(player);
          const checkboxDisabled = tempSelectedPlayers.length >= MAX_PLAYER_COUNT;

          return (
            <TableRow data-testid={`player-table-row-${player.id}`} key={index}>
              <TableCell data-testid={`checkbox-table-cell-${player.id}`}>
                <ControlledCheckbox
                  checkedValue={checkedValue}
                  isDisabled={checkboxDisabled}
                  onPlayerSelect={(value: boolean): void => onPlayerToggle(player, value)}
                />
              </TableCell>
              <TableCell data-testid={`player-name-table-cell-${player.id}`}>
                <Typography>{player.first_name} {player.second_name}</Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  <img
                    alt='team-crest'
                    data-testid={`player-team-crest-${player.id}`}
                    height='25vh'
                    src={`${process.env.PUBLIC_URL}/assets/images/crests/${team.code}.png`}
                    width='auto'
                  />
                  <Typography
                    data-testid={`player-team-name-${player.id}`}
                    display='inline'
                  >
                    {team.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography
                  data-testid={`player-position-text-${player.id}`}
                >
                  {position.singular_name_short}
                </Typography>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
