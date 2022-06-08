import React from "react";
import { Box,Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { getTeamById } from "helpers";
import { Player,PlayerStat, Team } from "types";

interface ComparisonTableProps {
  selectedPlayers: Player[];
  teams: Team[];
  elementStats: PlayerStat[];
}

export default function ComparisonTable({
  selectedPlayers,
  teams,
  elementStats
}: ComparisonTableProps): JSX.Element {

  const borderStyle = "1px solid rgb(196, 196, 196)";
  const customCellStyle = {
    border: borderStyle,
    backgroundColor: "rgb(224, 224, 224)"
  };

  const renderPlayerImageRow = (): JSX.Element => {
    return (
      <TableRow
        sx={{
          height: "12vh",
          "& .MuiTableCell-root": { borderBottom: borderStyle }
        }}
      >
        <TableCell sx={{ height: "inherit" }} />
        {selectedPlayers.map((player, key) => {
          const imgId = player.photo.replace(".jpg", "");
          const playerImgUrl = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imgId}.png`;

          return (
            <TableCell key={key} sx={{ height: "inherit" }}>
              <img alt='player-img' height='100%' src={playerImgUrl} width='auto' />
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  const renderPlayerNameRow = (): JSX.Element => {
    return (
      <TableRow sx={{ "& .MuiTableCell-root:last-child": { borderRight: "none" } }}>
        <TableCell sx={customCellStyle} />
        {selectedPlayers.map((player, key) => {
          return (
            <TableCell key={key} sx={customCellStyle}>
              <Typography
                sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
              >{`${player.first_name} ${player.second_name}`}
              </Typography>
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  const renderPlayerTeamRow = (): JSX.Element => {
    return (
      <TableRow>
        <TableCell sx={customCellStyle}>
          <Typography>Team</Typography>
        </TableCell>
        {selectedPlayers.map((player, key) => {
          return (
            <TableCell key={key}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  columnGap: 1
                }}
              >
                <img
                  alt='team-crest'
                  height='25px'
                  src={`${process.env.PUBLIC_URL}/assets/images/crests/${player.team_code}.png`}
                />
                {getTeamById(player.team, teams).name}
              </Box>
            </TableCell>
          );
        })}
      </TableRow>
    );
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
        {renderPlayerImageRow()}
        {renderPlayerNameRow()}
        {renderPlayerTeamRow()}
        {elementStats.map((stat, key) => {
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
