import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { getNormalizedString } from "helpers";
import { debounce } from "lodash";
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

  const [displayedPlayers, setDisplayedPlayers] = useState<Player[]>(players);
  const [searchInput, setSearchInput] = useState<string>("");
  const [playerIds, setPlayerIds] = React.useState<GridSelectionModel>([]);

  useEffect(() => {
    setPlayerIds(selectedPlayers.map(p => p.id));

    const close = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setAddPlayersModalOpen(false);
      }
    };

    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayers]);

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
    setPlayerIds([]);
    setAddPlayersModalOpen(false);
  };

  const onConfirmClick = (): void => {
    setSelectedComparisonPlayers(players.filter(p => playerIds.includes(p.id)));
    setPlayerIds([]);
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
            selectionModel={playerIds}
            setSelectionModel={setPlayerIds}
          />
        </Box>
      </>
    </CustomModal>
  );
};
