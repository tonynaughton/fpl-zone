import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Box, TextField } from "@mui/material";
import { AppDataContext } from "app_content";
import { getNormalizedString } from "helpers";
import { clone, debounce } from "lodash";
import { AppData, Player } from "types";

import { CustomModal } from "components/utils";

import { AddPlayersTable } from "..";

interface AddPlayersModalProps {
  isAddPlayersModalOpen: boolean;
  setAddPlayersModalOpen: (value: boolean) => void;
  selectedPlayers: Player[];
  setSelectedComparisonPlayers: (players: Player[]) => void;
}

export const AddPlayersModal = ({
  isAddPlayersModalOpen,
  setAddPlayersModalOpen,
  selectedPlayers,
  setSelectedComparisonPlayers
}: AddPlayersModalProps): JSX.Element => {
  const { players } = useContext(AppDataContext) as AppData;

  const [tempSelectedPlayers, setTempSelectedPlayers] = useState<Player[]>([]);
  const [displayedPlayers, setDisplayedPlayers] = useState<Player[]>(players);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    setTempSelectedPlayers(selectedPlayers);

    const close = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setAddPlayersModalOpen(false);
      }
    };

    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayers]);

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
    <CustomModal
      isModalOpen={isAddPlayersModalOpen}
      onCancelClick={onCancelClick}
      onConfirmClick={onConfirmClick}
      setModalOpen={setAddPlayersModalOpen}
      testId='add-players-modal'
      title='Add players to compare'
    >
      <>
        <TextField
          data-testid='player-search-input'
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
          border='1px solid gray'
          borderRadius={1}
          flexGrow={1}
          height='100%'
          marginBottom={1}
          maxHeight='100%'
          minHeight='50vh'
          overflow='auto'
          width='100%'
        >
          <AddPlayersTable
            displayedPlayers={displayedPlayers}
            tempSelectedPlayers={selectedPlayers}
            setTempSelectedPlayers={setTempSelectedPlayers}
          />
        </Box>
      </>
    </CustomModal>
  );
};
