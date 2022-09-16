import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getLocalImage } from "helpers";
import { sortBy } from "lodash";
import { AppData, Lineup as LineupType, Player as PlayerType, TeamData, TeamPicks } from "types";

import PlayerPerformanceModal from "./player_performance_modal/player_performance_modal";
import { LineupDetails } from "./lineup_details";
import { LineupRow } from "./lineup_row";

interface LineupProps {
  lineup: LineupType;
  teamPicks?: TeamPicks;
  teamData?: TeamData;
}

export default function Lineup({
  lineup,
  teamPicks,
  teamData
}: LineupProps): JSX.Element {
  const { teams, playerStats, isMobile } = useContext(AppDataContext) as AppData;

  const [isPlayerPerformanceModalOpen, setPlayerPerformanceModalOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);

  const sortedBench = sortBy(lineup.bench, ["element_type"]);

  const handlePlayerPerformanceClick = (player: PlayerType): void => {
    setPlayerPerformanceModalOpen(true);
    setSelectedPlayer(player);
  };

  const closePlayerPerformanceModal = (): void => setPlayerPerformanceModalOpen(false);

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
        height='100%'
        minHeight={0}
        overflow='hidden'
        padding={2}
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
          gap={isMobile ? 1 : 10}
          height='100%'
          minHeight={0}
          paddingBottom='5%'
          px={isMobile ? 0 : "5%"}
          sx={{
            backgroundImage: `url(${getLocalImage("pitch.png")})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat"
          }}
        >
          {lineup.selected.map((players, key) => (
            <LineupRow
              handlePlayerPerformanceClick={handlePlayerPerformanceClick}
              key={key}
              players={players}
              teamPicks={teamPicks}
            />
          ))}
        </Box>
        <Box
          className='flex-center'
          data-testid='bench-players'
          flexDirection='column'
          minHeight='20%'
        >
          <Typography variant='h4'>Bench</Typography>
          <LineupRow
            handlePlayerPerformanceClick={handlePlayerPerformanceClick}
            players={sortedBench}
            teamPicks={teamPicks}
          />
        </Box>
      </Box>
      {selectedPlayer && (
        <PlayerPerformanceModal
          closePlayerPerformanceModal={closePlayerPerformanceModal}
          isPlayerPerformanceModalOpen={isPlayerPerformanceModalOpen}
          playerStats={playerStats}
          selectedPlayer={selectedPlayer}
          teams={teams}
        />
      )}
    </>
  );
}
