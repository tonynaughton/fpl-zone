import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { Player,PlayerStat, Team } from "types";

import { AddPlayersButton } from "./add_players_button";
import { ImageRow } from "./player_image_row";
import { NameRow } from "./player_name_row";
import { TeamRow } from "./team_row";

interface ComparisonTableProps {
  selectedPlayers: Player[];
  teams: Team[];
  playerStats: PlayerStat[];
}

export const customBorderStyle = "1px solid rgb(196, 196, 196)";
export const customCellStyle = {
  border: customBorderStyle,
  backgroundColor: "rgb(224, 224, 224)"
};

export default function ComparisonTable({
  selectedPlayers,
  teams,
  playerStats
}: ComparisonTableProps): JSX.Element {
  const [ isAddPlayerModalOpen, setIsAddPlayerModalOpen ] = useState<boolean>(false);

  const onAddPlayerClick = (): void => {
    setIsAddPlayerModalOpen(true);
  };

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
        <ImageRow players={selectedPlayers} onAddPlayerClick={onAddPlayerClick} />
        <NameRow players={selectedPlayers} />
        <TeamRow players={selectedPlayers} teams={teams} />
        {playerStats.map((stat, key) => {
          return (
            <TableRow key={key}>
              <TableCell sx={customCellStyle}>
                <Typography
                  sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                >
                  {stat.label}
                </Typography>
              </TableCell>
              {selectedPlayers.map((player, key) => {
                return (
                  <TableCell key={key}>
                    <Typography>{player[stat.name]}</Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
