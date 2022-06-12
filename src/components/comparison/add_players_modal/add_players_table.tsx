import React from "react";
import { Box,Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { getPositionById,getTeamById } from "helpers";
import { Player, Position, Team } from "types";

import ControlledCheckbox from "components/utils/controlled_checkbox";

import { MAX_PLAYER_COUNT } from "..";

interface AddPlayersTableProps {
  players: Player[];
  onPlayerToggle: (player: Player, value: boolean) => void;
  selectedComparisonPlayers: Player[];
  tempSelectedPlayers: Player[];
  teams: Team[];
  positions: Position[];
}

export const AddPlayersTable = ({
  players,
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
              fontWeight='600'
              sx={{
                color: tempSelectedPlayers.length >= MAX_PLAYER_COUNT ? "red" : "black"
              }}
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
        {players.map((player, index) => {
          const team = getTeamById(player.team, teams);
          const position = getPositionById(player.element_type, positions);
          const checkedValue = tempSelectedPlayers.includes(player);

          return (
            <TableRow key={index}>
              <TableCell>
                <ControlledCheckbox
                  checkedValue={checkedValue}
                  isDisabled={tempSelectedPlayers.length === MAX_PLAYER_COUNT}
                  onPlayerSelect={(value: boolean): void => onPlayerToggle(player, value)}
                />
              </TableCell>
              <TableCell>
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
                    height='25vh'
                    src={`${process.env.PUBLIC_URL}/assets/images/crests/${team.code}.png`}
                    width='auto'
                  />
                  <Typography display='inline'>{team.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography>{position.singular_name_short}</Typography>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
