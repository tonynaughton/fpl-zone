import React, { useCallback, useContext, useState } from "react";
import { Check, Close } from "@mui/icons-material";
import { Autocomplete, Box, Chip, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import _ from "lodash";
import { AppData, Player } from "types";

import ControlledCheckbox from "components/utils/controlled_checkbox";

interface AddPlayersToComparisonModalProps {
  isAddPlayersModalOpen: boolean;
  setAddPlayersModalOpen: (value: boolean) => void;
  setSelectedComparisonPlayers: (players: Player[]) => void;
}

export const AddPlayersToComparisonModal = ({
  isAddPlayersModalOpen,
  setAddPlayersModalOpen
  // SetSelectedComparisonPlayers
}: AddPlayersToComparisonModalProps): JSX.Element => {
  const { playerStats, players, teams, positions } = useContext(AppDataContext) as AppData;

  const [tempSelectedPlayers, setTempSelectedPlayers] = useState<Player[]>([]);
  const [displayedPlayers, setDisplayedPlayers] = useState<Player[]>(players);
  const [searchInput, setSearchInput] = useState<string>("");

  const onPlayerSelect = (player: Player, value: boolean): void => {
    if (value) {
      setTempSelectedPlayers([...tempSelectedPlayers, player]);
    } else {
      const index = tempSelectedPlayers.indexOf(player);
      const newPlayers = tempSelectedPlayers.splice(index, 1);
      setTempSelectedPlayers(newPlayers);
    }
  };

  const performSearch = (value: string): void => {
    const filtered = players.filter((player) => {
      const input = value.toUpperCase();

      return player.web_name.toUpperCase().includes(input);
    });

    setDisplayedPlayers(filtered);
  };

  const debounceFn = useCallback(_.debounce(performSearch, 1000), []);

  return (
    <Box
      onClick={(): void => setAddPlayersModalOpen(false)}
      sx={{
        display: isAddPlayersModalOpen ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(0, 0, 0, 0.5)"
      }}
    >
      <Box
        onClick={(event): void => event.stopPropagation()}
        sx={{
          display: isAddPlayersModalOpen ? "flex" : "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          flexDirection: "column",
          alignItems: "center",
          rowGap: 1,
          zIndex: 2000,
          maxHeight: "75%",
          overflow: "auto",
          height: "100%"
        }}
      >
        <IconButton
          onClick={(): void => setAddPlayersModalOpen(false)}
          sx={{ position: "absolute", top: "12px", right: "12px" }}
        >
          <Close />
        </IconButton>
        <Typography variant='h3'>Add a player</Typography>
        <TextField
          fullWidth
          margin='dense'
          onChange={(event) => debounceFn(event.target.value)}
          placeholder='Search by name..'
          size='small'
          type='search'
        />
        <Box
          sx={{
            height: "60vh",
            width: "100%",
            border: "1px solid black",
            borderRadius: "2%",
            overflow: "auto",
            p: 1.5
          }}
        >
          <List>
            {displayedPlayers.map((player, index) => {
              return (
                <ListItem key={index}>
                  <ControlledCheckbox onPlayerSelect={(value: boolean) => onPlayerSelect(player, value)} />
                  {player.web_name}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};
