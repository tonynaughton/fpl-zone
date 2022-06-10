import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import { AppData } from "types";
import { Player } from "types/player";

import { AddPlayersToComparisonModal } from "./add_players_to_comparison_modal";
import ComparisonTable from "./player_comparison_table";

import "./comparison.css";

export default function PlayerComparison(): JSX.Element {
  const { playerStats, players, positions, teams } = useContext(AppDataContext) as AppData;

  const [isAddPlayersModalOpen, setIsAddPlayerModalOpen] = useState<boolean>(false);
  const [selectedComparisonPlayers, setSelectedComparisonPlayers] = useState<Player[]>([]);

  const onAddPlayerClick = (): void => {
    setIsAddPlayerModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        height: "100%"
      }}
    >
      <ComparisonTable
        onAddPlayerClick={onAddPlayerClick}
        playerStats={playerStats}
        selectedPlayers={selectedComparisonPlayers}
        teams={teams}
      />
      <AddPlayersToComparisonModal
        isAddPlayersModalOpen={isAddPlayersModalOpen}
        setAddPlayersModalOpen={setIsAddPlayerModalOpen}
        setSelectedComparisonPlayers={setSelectedComparisonPlayers}
      />
    </Box>
  );
}
