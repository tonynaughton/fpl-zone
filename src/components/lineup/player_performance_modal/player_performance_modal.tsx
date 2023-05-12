import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Box, Divider, Typography } from "@mui/material";
import { getPlayerData } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import { formatPrice,getPlayerImageUrl, getPositionById, getTeamById } from "helpers";
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

  const { gameweeks, positions, teams } = useContext(AppDataContext) as AppData;

  const currentGameweek = gameweeks.find((event) => event.is_current) as Gameweek;
  const playerPerformances = playerInfo?.history.filter(
    (fixture) => fixture.round === currentGameweek.id
  );
  const playerName = `${selectedPlayer.first_name.toUpperCase()} ${selectedPlayer.second_name.toUpperCase()}`;
  const playerTeam = getTeamById(selectedPlayer.team, teams);
  const playerImageUrl = getPlayerImageUrl(selectedPlayer);
  const positionLabel = getPositionById(selectedPlayer.element_type, positions).singular_name;

  const ModalContent = (): JSX.Element => {
    if (fetchingPlayerInfo) {
      return <Notifier message='Getting performance details..' />;
    }

    if (!playerPerformances?.length) {
      return <Notifier message='No fixtures' type='warning' />;
    }

    return (
      <Box
        className='flex-center'
        flexDirection='column'
        width='100%'
      >
        <Box
          display='flex'
          gap={1}
          height='10rem'
          // Avoid clipping modal close button
          pr={3}
          width='100%'
        >
          <img
            alt={`${playerName} portrait`}
            height='100%'
            src={playerImageUrl}
          />
          <Box flexGrow={1}>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical"
              }}
              textTransform='uppercase'
              variant='h4'
            >
              {playerName}
            </Typography>
            <Typography className='text-ellipsis' textTransform='uppercase'>{playerTeam.name}</Typography>
            <Typography className='text-ellipsis' textTransform='uppercase'>{positionLabel}</Typography>
            <Typography className='text-ellipsis' textTransform='uppercase'>£{formatPrice(selectedPlayer.now_cost)}m</Typography>
          </Box>
        </Box>
        {playerPerformances.map((performance, key) => (
          <Box key={key} width='100%'>
            <Divider sx={{ width: "100%" }} />
            <PlayerPerformance performance={performance} player={selectedPlayer} />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <CustomModal
      closeModal={closePlayerPerformanceModal}
      isModalOpen={isPlayerPerformanceModalOpen}
    >
      <ModalContent />
    </CustomModal>
  );
}
