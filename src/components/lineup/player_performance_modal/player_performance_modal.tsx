import React, { Fragment, useContext } from "react";
import { useQuery } from "react-query";
import { Close } from "@mui/icons-material";
import {
  Box,
  IconButton,
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

import { PlayerPerformance } from "./player_performance";

interface PlayerPerformanceModalProps {
  isPlayerPerformanceModalOpen: boolean;
  setPlayerPerformanceModalOpen: (value: boolean) => void;
  selectedPlayer: Player;
  playerStats: PlayerStat[];
  teams: Team[];
}

export default function PlayerPerformanceModal({
  isPlayerPerformanceModalOpen: isPlayerInfoModalOpen,
  setPlayerPerformanceModalOpen: setPlayerInfoModalOpen,
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
    <Box
      onClick={(): void => setPlayerInfoModalOpen(false)}
      sx={{
        display: isPlayerInfoModalOpen ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(0, 0, 0, 0.5)"
      }}
    >
      <Box
        onClick={(event): void => event.stopPropagation()}
        sx={{
          display: isPlayerInfoModalOpen ? "flex" : "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxHeight: "75%",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          flexDirection: "column",
          alignItems: "center",
          zIndex: 2000,
          overflow: "auto"
        }}
      >
        <IconButton
          onClick={(): void => setPlayerInfoModalOpen(false)}
          sx={{ position: "absolute", top: "4%", right: "4%" }}
        >
          <Close />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            rowGap: 3
          }}
        >
          {fetchingPlayerInfo
            ? (
              <Notifier message='Getting performance details..' />
            )
            : (
              <>
                <Typography variant='h3'>{playerName}</Typography>
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
      </Box>
    </Box>
  );
}
