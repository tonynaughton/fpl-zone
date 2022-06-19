import React from "react";
import { Box } from "@mui/material";
import { Player as PlayerType, TeamPicks } from "types";

import Player from "components/player/player";

interface LineupRowProps {
  players: PlayerType[];
  handlePlayerPerformanceClick: (player: PlayerType) => void;
  teamPicks?: TeamPicks;
  compressed?: boolean;
}

export const LineupRow = ({
  players,
  handlePlayerPerformanceClick,
  teamPicks,
  compressed = false
}: LineupRowProps): JSX.Element => {
  return (
    <Box
      alignItems='center'
      display='flex'
      height='100%'
      justifyContent='space-around'
      width='100%'
    >
      {players.map((player, key) => {
        const pick = teamPicks?.picks.find((pick) => pick.element === player.id);

        return (
          <Player
            compressed={compressed}
            handlePlayerPerformanceClick={handlePlayerPerformanceClick}
            isCaptain={pick?.is_captain}
            isViceCaptain={pick?.is_vice_captain}
            key={key}
            multiplier={pick?.multiplier || 1}
            player={player}
          />
        );
      })}
    </Box>
  );
};
