import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import { AppDataContext } from "app_content";
import { getLocalImage } from "helpers";
import { sortBy } from "lodash";
import { AppData, Gameweek, Lineup as LineupType, Player as PlayerType, TeamData, TeamPicks } from "types";

import PlayerPerformanceModal from "./player_performance_modal/player_performance_modal";
import { LineupDetails, TeamStats } from "./lineup_details";
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
  const { teams, playerStats, gameweeks } = useContext(AppDataContext) as AppData;

  const [isPlayerPerformanceModalOpen, setPlayerPerformanceModalOpen] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerType | null>(null);

  const currentGameweek = gameweeks.find((event) => event.is_current) as Gameweek;
  const sortedBench = sortBy(lineup.bench, ["element_type"]);

  const handlePlayerPerformanceClick = (player: PlayerType): void => {
    setPlayerPerformanceModalOpen(true);
    setSelectedPlayer(player);
  };


  const getTeamStats = (): TeamStats | undefined => {
    if (!teamData || !teamPicks) {
      return;
    }

    const totalPoints = lineup.selected
      .flat()
      .map(player => player.event_points)
      .reduce((pointsA, pointsB) => pointsA + pointsB);

    return ({
      activeChip: teamPicks.active_chip?.toUpperCase() || "None",
      totalPoints,
      overallRank: teamData.summary_overall_rank
    });
  };

  const closePlayerPerformanceModal = (): void => setPlayerPerformanceModalOpen(false);

  const teamName = teamData ? teamData.name : `Gameweek ${currentGameweek.id} Dream Team`;
  const teamStats = getTeamStats();

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        gap={1}
        height='100%'
        justifyContent='space-between'
        p={2}
      >
        <LineupDetails
          teamName={teamName}
          teamStats={teamStats}
        />
        <Box
          data-testid='selected-players'
          display='flex'
          flex={1}
          flexDirection='column'
          justifyContent='space-between'
          pb={2}
          sx={{
            backgroundImage: `url(${getLocalImage("misc/pitch.png")})`,
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
          flex={0.2}
          flexDirection='column'
        >
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
