/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Gameweek } from "types/gameweek";
import {
  Autocomplete,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Player } from "types/player";
import { getTeamById } from "helpers";
import { Fixture, PlayerStat, Team } from "types";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface PlayerComparisonProps {
  players: Player[];
  teams: Team[];
  fixtures: Fixture[];
  gameweek: Gameweek;
  elementStats: PlayerStat[];
}

export default function PlayerComparison({
  players,
  teams,
  fixtures,
  gameweek,
  elementStats,
}: PlayerComparisonProps): JSX.Element {
  console.log("🚀 ~ file: player_comparison.tsx ~ line 38 ~ gameweek", gameweek);
  console.log("🚀 ~ file: player_comparison.tsx ~ line 38 ~ fixtures", fixtures);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const handleAutocompleteChange = (_event: unknown, value: Player[]): void => {
    setSelectedPlayers(value);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const renderDropdownOption = (props, player: Player, { selected }): JSX.Element => {
    return (
      // eslint-disable-next-line react/prop-types
      <li {...props} key={props.id}>
        <Checkbox icon={icon} checkedIcon={checkedIcon} sx={{ mr: 0.5 }} checked={selected} />
        {`${player.first_name} ${player.second_name}`}
      </li>
    );
  };

  const renderComparisonOptions = (): JSX.Element => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          JustifyContent: "center",
          width: "100%",
          margin: "auto",
          columnGap: 2,
          p: 1.5,
          pl: "140px",
        }}
      >
        <Typography sx={{ fontSize: 22, color: "black" }}>Players: </Typography>
        <Autocomplete
          multiple
          id="player-select-options"
          groupBy={(player: Player): string => getTeamById(player.team, teams).name}
          options={players}
          disableCloseOnSelect
          disableListWrap
          fullWidth
          limitTags={4}
          getOptionLabel={(player: Player): string => `${player.first_name} ${player.second_name}`}
          renderOption={renderDropdownOption}
          renderInput={(params): JSX.Element => <TextField {...params} />}
          size="small"
          onChange={handleAutocompleteChange}
        />
      </Box>
    );
  };

  const renderPlayerComparisonTable = (): JSX.Element => {
    const textStyle = {
      fontSize: 16,
    };

    return (
      <Table
        aria-label="player comparison table"
        sx={{
          tableLayout: "fixed",
          height: "100%",
          flexGrow: "1",
          "& .MuiTableCell-root": { padding: "2px 4px" },
        }}
      >
        <TableBody>
          <TableRow sx={{ height: "15em", p: 0 }}>
            <TableCell></TableCell>
            {selectedPlayers.map((player, key) => {
              const imgId = player.photo.replace(".jpg", "");
              const playerImgUrl = `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imgId}.png`;
              return (
                <TableCell key={key} sx={{ height: "100%", p: 0 }}>
                  <img src={playerImgUrl} alt="player-img" height="100%" />
                </TableCell>
              );
            })}
          </TableRow>
          <TableRow sx={{ backgroundColor: "rgb(224, 224, 224)", height: "2em" }}>
            <TableCell></TableCell>
            {selectedPlayers.map((player, key) => {
              return (
                <TableCell key={key}>
                  <Typography
                    sx={textStyle}
                  >{`${player.first_name.toUpperCase()} ${player.second_name.toUpperCase()}`}</Typography>
                </TableCell>
              );
            })}
          </TableRow>
          {elementStats.map((stat, key) => {
            return (
              <TableRow key={key}>
                <TableCell>
                  <Typography sx={{ ...textStyle, pl: 1.5 }}>{stat.label}</Typography>
                </TableCell>
                {selectedPlayers.map((player, key) => {
                  return (
                    <TableCell key={key}>
                      <Typography sx={textStyle}>{player[stat.name]}</Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        height: "100%",
      }}
    >
      {renderComparisonOptions()}
      {renderPlayerComparisonTable()}
    </Box>
  );
}
