import React, { Fragment, useContext } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Typography
} from "@mui/material";
import { getPlayerData } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import {
  AppData,
  Gameweek,
  Player,
  PlayerStat,
  Team
} from "types";

import { Notifier } from "components/layout";
import { CustomModal } from "components/utils";

import { PlayerPerformance } from "./player_performance";

interface PlayerPerformanceModalProps {
  isPlayerPerformanceModalOpen: boolean;
  closePlayerPerformanceModal: () => void;
  selectedPlayer: Player;
  playerStats: PlayerStat[];
  teams: Team[];
}

export default function PlayerPerformanceModal({
  isPlayerPerformanceModalOpen,
  closePlayerPerformanceModal,
  selectedPlayer
}: PlayerPerformanceModalProps): JSX.Element {
  const { data: playerInfo, isLoading: fetchingPlayerInfo } = useQuery(
    [selectedPlayer],
    () => getPlayerData(selectedPlayer.id)
  );

  const { gameweeks } = useContext(AppDataContext) as AppData;

  const currentGameweek = gameweeks.find((event) => event.is_current) as Gameweek;
  const playerPerformances = playerInfo?.history.filter(
    (fixture) => fixture.round === currentGameweek.id
  );
  const playerName = `${selectedPlayer.first_name.toUpperCase()} ${selectedPlayer.second_name.toUpperCase()}`;

  return (
    <CustomModal
      closeModal={closePlayerPerformanceModal}
      isModalOpen={isPlayerPerformanceModalOpen}
      title={playerName}
    >
      <Box
        className='flex-center'
        flexDirection='column'
        gap={3}
        width='100%'
      >
        {fetchingPlayerInfo
          ? (
            <Notifier message='Getting performance details..' />
          )
          : (
            <>
              {playerPerformances?.length
                ? playerPerformances.map((performance, key) => {
                  return (
                    <Fragment key={key}>
                      <PlayerPerformance performance={performance} player={selectedPlayer} />
                    </Fragment>
                  );
                })
                : <Typography>No fixtures</Typography>}
            </>
          )}
      </Box>
    </CustomModal>
  );
}
