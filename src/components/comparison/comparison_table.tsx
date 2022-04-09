import { Table, TableBody, TableRow, TableCell, Typography, Box } from "@mui/material";
import { getTeamById } from "helpers";
import { PlayerStat, Team, Player } from "types";
import React from "react";

interface ComparisonTableProps {
  selectedPlayers: Player[];
  teams: Team[];
  elementStats: PlayerStat[];
}

export default function ComparisonTable({
  selectedPlayers,
  teams,
  elementStats,
}: ComparisonTableProps): JSX.Element {
  return (
    <Table
      aria-label="player comparison table"
      sx={{
        tableLayout: "fixed",
        flexGrow: "1",
        "& .MuiTableCell-root": { p: 0, maxHeight: "100px" },
      }}
    >
      <TableBody>
        <TableRow sx={{ height: "160px", p: 0 }}>
          <TableCell></TableCell>
          {selectedPlayers.map((player, key) => {
            const imgId = player.photo.replace(".jpg", "");
            const playerImgUrl = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imgId}.png`;
            return (
              <TableCell key={key} sx={{ p: 0, height: "160px" }}>
                <img src={playerImgUrl} alt="player-img" height="160px" width="auto" />
              </TableCell>
            );
          })}
        </TableRow>
        <TableRow sx={{ backgroundColor: "rgb(224, 224, 224)", height: "2em" }}>
          <TableCell></TableCell>
          {selectedPlayers.map((player, key) => {
            return (
              <TableCell key={key}>
                <Typography>{`${player.first_name.toUpperCase()} ${player.second_name.toUpperCase()}`}</Typography>
              </TableCell>
            );
          })}
        </TableRow>
        <TableRow sx={{ height: "2em" }}>
          <TableCell>
            <Typography variant="body2" sx={{ pl: 1.5 }}>
              Team
            </Typography>
          </TableCell>
          {selectedPlayers.map((player, key) => {
            return (
              <TableCell key={key}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    columnGap: 1,
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/images/crests/${player.team_code}.png`}
                    alt="team-crest"
                    height="25px"
                  />
                  {getTeamById(player.team, teams).name}
                </Box>
              </TableCell>
            );
          })}
        </TableRow>
        {elementStats.map((stat, key) => {
          return (
            <TableRow key={key}>
              <TableCell>
                <Typography variant="body2" sx={{ pl: 1.5 }}>
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
