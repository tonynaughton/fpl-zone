import React, { useEffect, useState } from "react";
import { ArrowUpward } from "@mui/icons-material";
import { Alert, Autocomplete, Box, Chip, Snackbar,TextField, Typography } from "@mui/material";
import { getTeamById } from "helpers";
import { PlayerStat, Position, Team } from "types";
import { Player } from "types/player";

import ComparisonTable from "./comparison_table";

interface PlayerComparisonProps {
  players: Player[];
  teams: Team[];
  elementStats: PlayerStat[];
  positions: Position[];
}

export default function PlayerComparison({
  players,
  teams,
  elementStats,
  positions
}: PlayerComparisonProps): JSX.Element {
  const MAX_PLAYER_COUNT = 10;
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAutocompleteChange = (_event: unknown, value: Player[]): void => {
    setSelectedPlayers(value);
  };

  useEffect(() => {
    if (selectedPlayers.length === MAX_PLAYER_COUNT) {
      setSnackbarOpen(true);
    }
  }, [selectedPlayers]);

  const renderDropdownOption = (props, player: Player): JSX.Element => {
    const positionName = positions.find((pos) => pos.id === player.element_type);

    return (
      // eslint-disable-next-line react/prop-types
      <li {...props} key={props.id}>
        <Typography>
          {`${player.first_name} ${player.second_name} (${
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            positionName!.singular_name_short
          })`}
        </Typography>
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
          columnGap: 2,
          p: 2,
          pl: "170px"
        }}
      >
        <Typography sx={{ fontSize: 22, color: "black" }}>Players: </Typography>
        <Autocomplete
          clearOnBlur
          disableCloseOnSelect
          disableListWrap
          disabled={selectedPlayers.length >= MAX_PLAYER_COUNT}
          fullWidth
          getOptionLabel={(player: Player): string => `${player.first_name} ${player.second_name}`}
          groupBy={(player: Player): string => getTeamById(player.team, teams).name}
          id='player-select-options'
          limitTags={MAX_PLAYER_COUNT}
          multiple
          onBlur={(): void => setDropdownOpen(false)}
          onChange={handleAutocompleteChange}
          onClose={(): void => setDropdownOpen(false)}
          onOpen={(): void => setDropdownOpen(true)}
          open={dropdownOpen}
          options={players}
          renderInput={(params): JSX.Element => <TextField {...params} />}
          renderOption={renderDropdownOption}
          renderTags={(player: Player[], getTagProps): JSX.Element[] => player.map((player, index) => (
            <Chip
              {...getTagProps({ index })}
              disabled={false}
              key={index}
              label={<Typography>{player.web_name}</Typography>}
            />
          ))}
          size='small'
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
          p: 2
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
              backgroundColor: "rgb(224, 224, 224)"
            },
            width: "20%"
          }}
        >
          <ArrowUpward
            sx={{ borderRadius: "50%", backgroundColor: "#16B7EA", color: "white", fontSize: 40 }}
          />
          <Typography textAlign='center'>Add a player from the drop down to get started</Typography>
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
        height: "100%"
      }}
    >
      {renderComparisonOptions()}
      {selectedPlayers.length > 0
        ? (
          <ComparisonTable
            elementStats={elementStats}
            selectedPlayers={selectedPlayers}
            teams={teams}
          />
        )
        : (
          renderAddPlayersBtn()
        )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        autoHideDuration={5000}
        onClose={(): void => setSnackbarOpen(false)}
        open={snackbarOpen}
      >
        <Alert
          elevation={6}
          onClose={(): void => setSnackbarOpen(false)}
          severity='error'
          variant='filled'
        >
          Maximum player count reached ({MAX_PLAYER_COUNT})
        </Alert>
      </Snackbar>
    </Box>
  );
}
