import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Close } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getNormalizedString } from "helpers";
import { clone, debounce } from "lodash";
import { AppData, Player } from "types";

import { AddPlayersTable } from "..";

import { ModalFooter } from "./modal_footer";

interface AddPlayersToComparisonModalProps {
  isAddPlayersModalOpen: boolean;
  setAddPlayersModalOpen: (value: boolean) => void;
  selectedComparisonPlayers: Player[];
  setSelectedComparisonPlayers: (players: Player[]) => void;
}

export const AddPlayersToComparisonModal = ({
  isAddPlayersModalOpen,
  setAddPlayersModalOpen,
  selectedComparisonPlayers,
  setSelectedComparisonPlayers
}: AddPlayersToComparisonModalProps): JSX.Element => {
  const { players, teams, positions } = useContext(AppDataContext) as AppData;

  const [tempSelectedPlayers, setTempSelectedPlayers] = useState<Player[]>([]);
  const [displayedPlayers, setDisplayedPlayers] = useState<Player[]>(players);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    setTempSelectedPlayers(selectedComparisonPlayers);

    const close = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setAddPlayersModalOpen(false);
      }
    };

    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedComparisonPlayers]);

  const onPlayerToggle = (player: Player, value: boolean): void => {
    if (value) {
      setTempSelectedPlayers([...tempSelectedPlayers, player]);
    } else {
      const clonedTempPlayers = clone(tempSelectedPlayers);
      const index = clonedTempPlayers.indexOf(player);
      clonedTempPlayers.splice(index, 1);
      setTempSelectedPlayers(clonedTempPlayers);
    }
  };

  const memoizedTable = useMemo(() => AddPlayersTable({
    onPlayerToggle,
    players: displayedPlayers,
    selectedComparisonPlayers,
    tempSelectedPlayers,
    teams,
    positions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [displayedPlayers, tempSelectedPlayers, selectedComparisonPlayers]);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(performSearch, 1000), []);

  const onCancelClick = (): void => {
    setTempSelectedPlayers([]);
    setAddPlayersModalOpen(false);
  };

  const onConfirmClick = (): void => {
    setSelectedComparisonPlayers(tempSelectedPlayers);
    setTempSelectedPlayers([]);
    setDisplayedPlayers(players);
    setSearchInput("");
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
          onChange={(event): void => {
            debounceSearch(event.target.value);
            setSearchInput(event.target.value);
          }}
          placeholder='Search by name..'
          size='small'
          type='search'
          value={searchInput}
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
          {memoizedTable}
        </Box>
        <ModalFooter onCancelClick={onCancelClick} onConfirmClick={onConfirmClick} />
      </Box>
    </Box>
  );
};
