import React, { useCallback, useContext, useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import _ from "lodash";
import { AppData, Player } from "types";

import { AddPlayersTable } from "..";

import { ModalFooter } from "./modal_footer";
import { getNormalizedString } from "helpers";

interface AddPlayersToComparisonModalProps {
  isAddPlayersModalOpen: boolean;
  setAddPlayersModalOpen: (value: boolean) => void;
  selectedComparisonPlayers: Player[];
  setSelectedComparisonPlayers: (players: Player[]) => void;
  maxPlayerCount: number;
}

export const AddPlayersToComparisonModal = ({
  isAddPlayersModalOpen,
  setAddPlayersModalOpen,
  selectedComparisonPlayers,
  setSelectedComparisonPlayers,
  maxPlayerCount
}: AddPlayersToComparisonModalProps): JSX.Element => {
  const { players } = useContext(AppDataContext) as AppData;

  const [tempSelectedPlayers, setTempSelectedPlayers] = useState<Player[]>([]);
  const [displayedPlayers, setDisplayedPlayers] = useState<Player[]>(players);

  useEffect(() => {
    setTempSelectedPlayers(selectedComparisonPlayers);

  }, [selectedComparisonPlayers]);

  const onPlayerToggle = (player: Player, value: boolean): void => {
    if (value) {
      setTempSelectedPlayers([...tempSelectedPlayers, player]);
    } else {
      const clonedTempPlayers = _.clone(tempSelectedPlayers);
      const index = clonedTempPlayers.indexOf(player);
      clonedTempPlayers.splice(index, 1);
      setTempSelectedPlayers(clonedTempPlayers);
    }
  };

  const performSearch = (input: string): void => {
    const normalizedInput = getNormalizedString(input);

    const filtered = players.filter((player) => {  

      let searchResult = false;

      // Searching player web name i.e. 'known as'
      const normalizedWebName = getNormalizedString(player.web_name);
      if (normalizedWebName.includes(normalizedInput)) {
        searchResult = true;
      }

      // Searching player full name
      const fullName = `${player.first_name} ${player.second_name}`;
      const normalizedFullName = getNormalizedString(fullName);
      if (normalizedFullName.includes(normalizedInput)) {
        searchResult = true;
      }

      return searchResult;
    });

    setDisplayedPlayers(filtered);
  };

  const debounceSearch = useCallback(_.debounce(performSearch, 1000), []);

  const onCancelClick = (): void => {
    setTempSelectedPlayers([]);
    setAddPlayersModalOpen(false);
  };

  const onConfirmClick = (): void => {
    setSelectedComparisonPlayers(tempSelectedPlayers);
    setAddPlayersModalOpen(false);
  };

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
          height: "90%"
        }}
      >
        <IconButton
          onClick={(): void => setAddPlayersModalOpen(false)}
          sx={{ position: "absolute", top: 15, right: 25 }}
        >
          <Close />
        </IconButton>
        <Typography variant='h3'>Add players to compare</Typography>
        <TextField
          fullWidth
          margin='normal'
          onChange={(event): void => debounceSearch(event.target.value)}
          placeholder='Search by name..'
          size='small'
          type='search'
        />
        <Box
          flexGrow={1}
          sx={{
            width: "100%",
            border: "1px solid gray",
            borderRadius: 1,
            overflow: "auto",
            mb: 1
          }}
        >
          <AddPlayersTable
            maxPlayerCount={maxPlayerCount}
            onPlayerToggle={onPlayerToggle}
            players={displayedPlayers}
            selectedComparisonPlayers={selectedComparisonPlayers}
            tempSelectedPlayers={tempSelectedPlayers}
          />
        </Box>
        <ModalFooter onCancelClick={onCancelClick} onConfirmClick={onConfirmClick} />
      </Box>
    </Box>
  );
};
