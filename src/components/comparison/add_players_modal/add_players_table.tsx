import React, { useContext } from "react";
import { Box,Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getPositionById,getTeamById } from "helpers";
import { AppData, Player } from "types";

import ControlledCheckbox from "components/utils/controlled_checkbox";

interface AddPlayersTableProps {
  players: Player[];
  onPlayerToggle: (player: Player, value: boolean) => void;
  selectedComparisonPlayers: Player[];
  tempSelectedPlayers: Player[];
  maxPlayerCount: number;
}

export const AddPlayersTable = ({
  players,
  onPlayerToggle,
  selectedComparisonPlayers,
  tempSelectedPlayers,
  maxPlayerCount
}: AddPlayersTableProps): JSX.Element => {
  const { teams, positions } = useContext(AppDataContext) as AppData;

  return (
    <Table stickyHeader sx={{ tableLayout: "fixed" }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ pl: 2 }}>
            <Typography
              fontWeight='600'
              sx={{
                color: tempSelectedPlayers.length >= maxPlayerCount ? "red" : "black"
              }}
            >
              {tempSelectedPlayers.length}/{maxPlayerCount}
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
          const checkedValue = selectedComparisonPlayers.includes(player);

          return (
            <TableRow key={index}>
              <TableCell>
                <ControlledCheckbox
                  checkedValue={checkedValue}
                  isDisabled={tempSelectedPlayers.length === maxPlayerCount}
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
