import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import { clone } from "lodash";
import { AppData } from "types";
import { Player } from "types/player";

import { AddPlayersModal, ComparisonTable } from ".";

export const MAX_PLAYER_COUNT = 5;

export const PlayerComparison = (): JSX.Element => {
  const { playerStats, teams } = useContext(AppDataContext) as AppData;

  const [isAddPlayersModalOpen, setIsAddPlayerModalOpen] = useState<boolean>(true);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const openAddPlayersModal = (): void => setIsAddPlayerModalOpen(true);
  const closeAddPlayersModal = (): void => setIsAddPlayerModalOpen(false);

  const onRemovePlayerClick = (player: Player): void => {
    const clonedSelectedPlayers = clone(selectedPlayers);
    const index = clonedSelectedPlayers.indexOf(player);
    clonedSelectedPlayers.splice(index, 1);
    setSelectedPlayers(clonedSelectedPlayers);
  };

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      height='100%'
      overflow='auto'
      width='100%'
    >
      <ComparisonTable
        onAddPlayerClick={openAddPlayersModal}
        onRemovePlayerClick={onRemovePlayerClick}
        playerStats={playerStats}
        selectedPlayers={selectedPlayers}
        teams={teams}
      />
      <AddPlayersModal
        closeAddPlayersModal={closeAddPlayersModal}
        isAddPlayersModalOpen={isAddPlayersModalOpen}
        selectedPlayers={selectedPlayers}
        setSelectedPlayers={setSelectedPlayers}
      />
    </Box>
  );
};
