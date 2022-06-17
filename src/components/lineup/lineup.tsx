import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import _ from "lodash";
import { AppData, Player as PlayerType, TeamData, TeamPicks } from "types";

import Player from "../player/player";

import PlayerPerformanceModal from "./player_performance_modal/player_performance_modal";
import { LineupDetails } from "./lineup_details";

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

  const sortedBench = _.sortBy(bench, ["element_type"]);

  const handlePlayerPerformanceClick = (player: PlayerType): void => {
    setPlayerPerformanceModalOpen(true);
    setSelectedPlayer(player);
  };

  const renderSelected = (): JSX.Element => {
    return (
      <Box
        data-testid='selected-players'
        sx={{
          pl: "5%",
          pr: "5%",
          pb: "5%",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pitch.png)`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          height: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}
      >
        {selected.map((positionGroup, key) => {
          return (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%"
              }}
            >
              {positionGroup.map((player, key) => {
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
        })}
      </Box>
    );
  };

  const renderBench = (): JSX.Element => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <Typography variant='h4'>Bench</Typography>
        <Box
          data-testid='bench-players'
          sx={{
            display: "flex",
            width: "100%",
            mt: 1,
            justifyContent: "space-around",
            alignItems: "center",
            "& > div:nth-of-type(1)": {
              mr: 3
            }
          }}
        >
          {sortedBench.map((player, key) => {
            const pick = teamPicks?.picks.find((pick) => pick.element === player.id);

            return (
              <Player
                compressed={compressed}
                handlePlayerPerformanceClick={handlePlayerPerformanceClick}
                key={key}
                multiplier={pick?.multiplier || 1}
                player={player}
              />
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: "2%"
        }}
      >
        {teamData && teamPicks &&
          <LineupDetails
            teamData={teamData}
            teamPicks={teamPicks}
          />}
        {renderSelected()}
        {renderBench()}
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
