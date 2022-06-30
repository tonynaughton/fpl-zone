import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import { clone } from "lodash";
import { AppData } from "types";
import { Player } from "types/player";

import { AddPlayersModal, ComparisonTable } from ".";

import "./comparison.css";

export const MAX_PLAYER_COUNT = 5;

export const PlayerComparison = (): JSX.Element => {
  const { playerStats, teams } = useContext(AppDataContext) as AppData;

  const [isAddPlayersModalOpen, setIsAddPlayerModalOpen] = useState<boolean>(true);
  const [selectedComparisonPlayers, setSelectedComparisonPlayers] = useState<Player[]>([]);

  const onAddPlayerClick = (): void => {
    setIsAddPlayerModalOpen(true);
  };

  const onRemovePlayerClick = (player: Player): void => {
    const clonedSelectedPlayers = clone(selectedComparisonPlayers);
    const index = clonedSelectedPlayers.indexOf(player);
    clonedSelectedPlayers.splice(index, 1);
    setSelectedComparisonPlayers(clonedSelectedPlayers);
  };

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      height='100%'
      overflow='auto'
    >
      <ComparisonTable
        onAddPlayerClick={onAddPlayerClick}
        onRemovePlayerClick={onRemovePlayerClick}
        playerStats={playerStats}
        selectedPlayers={selectedComparisonPlayers}
        teams={teams}
      />
      <AddPlayersModal
        isAddPlayersModalOpen={isAddPlayersModalOpen}
        selectedPlayers={selectedComparisonPlayers}
        setAddPlayersModalOpen={setIsAddPlayerModalOpen}
        setSelectedComparisonPlayers={setSelectedComparisonPlayers}
      />
    </Box>
  );
};
