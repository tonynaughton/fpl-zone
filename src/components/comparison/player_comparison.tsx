import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import _ from "lodash";
import { AppData } from "types";
import { Player } from "types/player";

import { AddPlayersToComparisonModal, PlayerComparisonTable } from ".";

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
    const clonedSelectedPlayers = _.clone(selectedComparisonPlayers);
    const index = clonedSelectedPlayers.indexOf(player);
    clonedSelectedPlayers.splice(index, 1);
    setSelectedComparisonPlayers(clonedSelectedPlayers);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        height: "100%",
        overflow: "auto"
      }}
    >
      <PlayerComparisonTable
        onAddPlayerClick={onAddPlayerClick}
        onRemovePlayerClick={onRemovePlayerClick}
        playerStats={playerStats}
        selectedPlayers={selectedComparisonPlayers}
        teams={teams}
      />
      <AddPlayersToComparisonModal
        isAddPlayersModalOpen={isAddPlayersModalOpen}
        selectedComparisonPlayers={selectedComparisonPlayers}
        setAddPlayersModalOpen={setIsAddPlayerModalOpen}
        setSelectedComparisonPlayers={setSelectedComparisonPlayers}
      />
    </Box>
  );
};
