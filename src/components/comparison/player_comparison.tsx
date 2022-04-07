/* eslint-disable no-unused-vars */
import React from "react";
import { Gameweek } from "types/gameweek";
import { Autocomplete, Box, Checkbox, TextField, Typography } from "@mui/material";
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
  console.log("🚀 ~ file: player_comparison.tsx ~ line 26 ~ teams", teams);
  console.log(gameweek);
  console.log(fixtures);
  console.log(players);
  console.log(elementStats);

  const renderDropdownOption = (props, player: Player, { selected }): JSX.Element => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
      // eslint-disable-next-line react/prop-types
      <li {...props} key={props.id}>
        <Checkbox icon={icon} checkedIcon={checkedIcon} sx={{ mr: 0.5 }} checked={selected} />
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/crests/${player.team_code}.png`}
          alt="team-crest"
          height="28em"
          style={{ marginRight: 6 }}
        />
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
          width: "80%",
          margin: "auto",
          columnGap: 2,
        }}
      >
        <Typography sx={{ fontSize: 22, color: "black" }}>Players: </Typography>
        <Autocomplete
          sx={{ flexGrow: 1 }}
          multiple
          id="player-select-options"
          groupBy={(player: Player): string => getTeamById(player.team, teams).name}
          options={players}
          disableCloseOnSelect
          getOptionLabel={(player: Player): string => `${player.first_name} ${player.second_name}`}
          renderOption={renderDropdownOption}
          renderInput={(params): JSX.Element => <TextField {...params} />}
          size="small"
        />
      </Box>
    );
  };

  return (
    <Box sx={{ p: 5, display: "flex", flexDirection: "column", alignItem: "center" }}>
      {renderComparisonOptions()}
    </Box>
  );
}
