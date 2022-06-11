import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import _ from "lodash";
import { AppData } from "types";
import { Player } from "types/player";

import ComparisonTable from "./player_comparison_table";
import { AddPlayersToComparisonModal } from ".";

import "./comparison.css";

export default function PlayerComparison(): JSX.Element {
  const { playerStats, teams } = useContext(AppDataContext) as AppData;

  const [isAddPlayersModalOpen, setIsAddPlayerModalOpen] = useState<boolean>(true);
  const [selectedComparisonPlayers, setSelectedComparisonPlayers] = useState<Player[]>([]);

  const maxPlayerCount = 5;

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
      <ComparisonTable
        maxPlayerCount={maxPlayerCount}
        onAddPlayerClick={onAddPlayerClick}
        onRemovePlayerClick={onRemovePlayerClick}
        playerStats={playerStats}
        selectedPlayers={selectedComparisonPlayers}
        teams={teams}
      />
      <AddPlayersToComparisonModal
        isAddPlayersModalOpen={isAddPlayersModalOpen}
        maxPlayerCount={maxPlayerCount}
        selectedComparisonPlayers={selectedComparisonPlayers}
        setAddPlayersModalOpen={setIsAddPlayerModalOpen}
        setSelectedComparisonPlayers={setSelectedComparisonPlayers}
      />
    </Box>
  );
}
