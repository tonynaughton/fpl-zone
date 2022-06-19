import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getLocalImage } from "helpers";
import { sortBy } from "lodash";
import { AppData, Player as PlayerType, TeamData, TeamPicks } from "types";

import PlayerPerformanceModal from "./player_performance_modal/player_performance_modal";
import { LineupDetails } from "./lineup_details";
import { LineupRow } from "./lineup_row";

interface LineupProps {
  selected: PlayerType[][];
  bench: PlayerType[];
  compressed?: boolean;
  teamPicks?: TeamPicks;
  teamData?: TeamData;
}

export default function Lineup({
  selected,
  bench,
  teamPicks,
  teamData,
  compressed = false
}: LineupProps): JSX.Element {
  const { teams, playerStats } = useContext(AppDataContext) as AppData;

  const [isPlayerPerformanceModalOpen, setPlayerPerformanceModalOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);

  const sortedBench = sortBy(bench, ["element_type"]);

  const handlePlayerPerformanceClick = (player: PlayerType): void => {
    setPlayerPerformanceModalOpen(true);
    setSelectedPlayer(player);
  };

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
        height='100%'
        overflow='hidden'
        padding={3}
      >
        {teamData && teamPicks &&
          <LineupDetails
            teamData={teamData}
            teamPicks={teamPicks}
          />}
        <Box
          data-testid='selected-players'
          display='flex'
          flexDirection='column'
          gap={3}
          height='100%'
          paddingBottom='5%'
          paddingLeft='5%'
          paddingRight='5%'
          sx={{
            backgroundImage: `url(${getLocalImage("pitch.png")})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat"
          }}
        >
          {selected.map((players, key) => (
            <LineupRow
              compressed={compressed}
              handlePlayerPerformanceClick={handlePlayerPerformanceClick}
              key={key}
              players={players}
              teamPicks={teamPicks}
            />
          ))}
        </Box>
        <Box className='flex-center' flexDirection='column' height='25%'>
          <Typography variant='h4'>Bench</Typography>
          <LineupRow
            compressed={compressed}
            handlePlayerPerformanceClick={handlePlayerPerformanceClick}
            players={sortedBench}
            teamPicks={teamPicks}
          />
        </Box>
      </Box>
      {selectedPlayer && (
        <PlayerPerformanceModal
          isPlayerPerformanceModalOpen={isPlayerPerformanceModalOpen}
          playerStats={playerStats}
          selectedPlayer={selectedPlayer}
          setPlayerPerformanceModalOpen={setPlayerPerformanceModalOpen}
          teams={teams}
        />
      )}
    </>
  );
}
