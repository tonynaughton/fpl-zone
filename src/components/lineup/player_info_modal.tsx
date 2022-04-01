import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Player, PlayerPerformance, PlayerStat, Team } from "types";
import { Close } from "@mui/icons-material";
import { getPlayerData } from "api/fpl_api_provider";
import { useQuery } from "react-query";
import { formatDate, getTeamById } from "helpers";
import Loading from "components/layout/loading";

interface PlayerInfoModalProps {
  isPlayerInfoModalOpen: boolean;
  setPlayerInfoModalOpen: (value: boolean) => void;
  selectedPlayer: Player;
  elementStats: PlayerStat[];
  teams: Team[];
}

export default function PlayerInfoModal({
  isPlayerInfoModalOpen,
  setPlayerInfoModalOpen,
  selectedPlayer,
  elementStats,
  teams,
}: PlayerInfoModalProps): JSX.Element {
  console.log("🚀 ~ file: player_info_modal.tsx ~ line 19 ~ elementStats", elementStats);
  const { data: playerInfo } = useQuery([selectedPlayer], async () => {
    return getPlayerData(selectedPlayer.id);
  });

  const performance = playerInfo?.history.slice(-1)[0];
  console.log("🚀 ~ file: player_info_modal.tsx ~ line 32 ~ performance", performance);

  const statImageNames = {
    goals_scored: "football",
    assists: "boot",
    yellow_cards: "yellow_card",
    red_cards: "red_card",
  };

  const renderTitle = (): JSX.Element => {
    if (selectedPlayer && performance) {
      const playerName = `${selectedPlayer.first_name.toUpperCase()} ${selectedPlayer.second_name.toUpperCase()}`;
      const opposition = getTeamById(performance?.opponent_team, teams);
      const date = formatDate(new Date(performance.kickoff_time));
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            rowGap: 1,
          }}
        >
          <Typography fontSize={26}>{playerName}</Typography>
          <Typography fontSize={16}>vs. {opposition.name}</Typography>
          <Typography fontSize={16}>{date}</Typography>
        </Box>
      );
    } else {
      return <Loading message="Getting performance details.."></Loading>;
    }
  };

  return (
    <Box
      sx={{
        display: isPlayerInfoModalOpen ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgb(0, 0, 0, 0.5)",
      }}
      onClick={(): void => setPlayerInfoModalOpen(false)}
    >
      <Box
        sx={{
          display: isPlayerInfoModalOpen ? "flex" : "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          flexDirection: "column",
          alignItems: "center",
          rowGap: "1em",
          zIndex: 2000,
        }}
        // https://stackoverflow.com/questions/49637047/prevent-onclick-from-firing-if-another-element-is-on-top
        onClick={(event): void => event.stopPropagation()}
      >
        <IconButton
          onClick={(): void => setPlayerInfoModalOpen(false)}
          sx={{ position: "absolute", top: "12px", right: "12px" }}
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
            rowGap: 3,
          }}
        >
          {renderTitle()}
        </Box>
      </Box>
    </Box>
  );
}
