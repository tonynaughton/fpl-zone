/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Autocomplete, Box, Checkbox, TextField, Typography } from "@mui/material";
import { Player } from "types/player";
import { getTeamById } from "helpers";
import { Fixture, Gameweek, PlayerStat, Team } from "types";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { ArrowUpward } from "@mui/icons-material";
import ComparisonTable from "./comparison_table";

interface PlayerComparisonProps {
  players: Player[];
  teams: Team[];
  fixtures: Fixture[];
  elementStats: PlayerStat[];
  gameweek: Gameweek;
}

export default function PlayerComparison({
  players,
  teams,
  fixtures,
  elementStats,
  gameweek,
}: PlayerComparisonProps): JSX.Element {
  console.log("🚀 ~ file: player_comparison.tsx ~ line 27 ~ gameweek", gameweek);
  console.log("🚀 ~ file: player_comparison.tsx ~ line 38 ~ fixtures", fixtures);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

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
          pl: "180px",
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
          open={dropdownOpen}
          onOpen={(): void => setDropdownOpen(true)}
          onClose={(): void => setDropdownOpen(false)}
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

  const renderAddPlayersBtn = (): JSX.Element => {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          onClick={(): void => setDropdownOpen(true)}
          sx={{
            display: "flex",
            boxShadow: 5,
            alignItems: "center",
            p: 2,
            flexDirection: "column",
            rowGap: 2,
            borderRadius: "10%",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgb(224, 224, 224)",
            },
            width: "20%",
          }}
        >
          <ArrowUpward
            sx={{ borderRadius: "50%", backgroundColor: "#16B7EA", color: "white", fontSize: 40 }}
          />
          <Typography textAlign="center">Add a player from the drop down to get started</Typography>
        </Box>
      </Box>
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
      {selectedPlayers.length > 0 ? (
        <ComparisonTable
          selectedPlayers={selectedPlayers}
          teams={teams}
          elementStats={elementStats}
        />
      ) : (
        renderAddPlayersBtn()
      )}
    </Box>
  );
}
