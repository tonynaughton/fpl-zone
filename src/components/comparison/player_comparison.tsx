import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import { AppData } from "types";
import { Player } from "types/player";

import ComparisonTable from "./comparison_table";

export default function PlayerComparison(): JSX.Element {
  const { playerStats, players, positions, teams } = useContext(AppDataContext) as AppData;

  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const MAX_PLAYER_COUNT = 5;

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
        playerStats={playerStats}
        selectedPlayers={selectedPlayers}
        teams={teams}
      />
    </Box>
  );
}
