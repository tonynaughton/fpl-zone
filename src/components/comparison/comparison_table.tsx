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
          height: "160px",
          "& .MuiTableCell-root": { borderBottom: borderStyle }
        }}
      >
        <TableCell></TableCell>
        {selectedPlayers.map((player, key) => {
          const imgId = player.photo.replace(".jpg", "");
          const playerImgUrl = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imgId}.png`;
          return (
            <TableCell key={key} sx={{ height: "160px" }}>
              <img src={playerImgUrl} alt='player-img' height='160px' width='auto' />
            </TableCell>
          );
        })}
      </TableRow>
    );
  };

  const renderPlayerNameRow = (): JSX.Element => {
    return (
      <TableRow sx={{ "& .MuiTableCell-root:last-child": { borderRight: "none" } }}>
        <TableCell sx={customCellStyle}></TableCell>
        {selectedPlayers.map((player, key) => {
          return (
            <TableCell key={key} sx={customCellStyle}>
              <Typography
                sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                variant='body2'
              >{`${player.first_name} ${player.second_name}`}</Typography>
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
          <Typography variant='body2'>Team</Typography>
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
                  src={`${process.env.PUBLIC_URL}/assets/images/crests/${player.team_code}.png`}
                  alt='team-crest'
                  height='25px'
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
        flexGrow: "1"
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
                  variant='body2'
                >
                  {stat.label}
                </Typography>
              </TableCell>
              {selectedPlayers.map((player, key) => {
                return (
                  <TableCell key={key}>
                    <Typography variant='body2'>{player[stat.name]}</Typography>
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
