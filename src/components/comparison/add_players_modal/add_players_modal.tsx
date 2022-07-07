import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { debounce } from "lodash";
import { AppData, Player } from "types";

import { CustomModal } from "components/utils";

import { AddPlayersTable } from "./add_players_table";

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

  const [searchInput, setSearchInput] = useState<string>("");
  const [filterProp, setFilterProp] = useState<string>("");
  const [playerIds, setPlayerIds] = React.useState<GridSelectionModel>([]);

  useEffect(() => {
    setPlayerIds(selectedPlayers.map(p => p.id));

    const close = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        resetState();
      }
    };

    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayers]);

  const resetState = (): void => {
    setSearchInput("");
    setFilterProp("");
    setAddPlayersModalOpen(false);
  };

  const onConfirmClick = (): void => {
    setSelectedComparisonPlayers(players.filter(p => playerIds.includes(p.id)));
    resetState();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce((searchInput) => setFilterProp(searchInput), 1000), []);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    setSearchInput(input);
    debounceSearch(input);
  };

  return (
    <CustomModal
      isModalOpen={isAddPlayersModalOpen}
      onCancelClick={resetState}
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
          onChange={onSearchInputChange}
          placeholder='Search by player name..'
          size='small'
          type='search'
          value={searchInput}
        />
        <Box height='70vh' width='100%'>
          <AddPlayersTable
            searchInput={filterProp}
            selectionModel={playerIds}
            setSelectionModel={setPlayerIds}
          />
        </Box>
      </>
    </CustomModal>
  );
};
