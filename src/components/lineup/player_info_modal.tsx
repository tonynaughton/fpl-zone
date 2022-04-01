import React from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { CustomResult, Player, PlayerPerformance, PlayerStat, Team } from "types";
import { Close } from "@mui/icons-material";
import { getPlayerData } from "api/fpl_api_provider";
import { useQuery } from "react-query";
import { formatDate, getTeamById } from "helpers";
import Loading from "components/layout/loading";
import { renderResult } from "components/results/results";
import _ from "lodash";

interface Stat {
  name: string;
  value: number;
}

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
  const { data: playerInfo } = useQuery([selectedPlayer], async () => {
    return getPlayerData(selectedPlayer.id);
  });

  const performance = playerInfo?.history.slice(-1)[0];

  const statImageNames = {
    goals_scored: "football",
    assists: "boot",
    yellow_cards: "yellow_card",
    red_cards: "red_card",
  };

  const renderHeader = (): JSX.Element => {
    const playerName = `${selectedPlayer.first_name.toUpperCase()} ${selectedPlayer.second_name.toUpperCase()}`;
    const customResult: CustomResult = {
      team_h: performance!.was_home ? selectedPlayer.team : performance!.opponent_team,
      team_a: performance!.was_home ? performance!.opponent_team : selectedPlayer.team,
      team_h_score: performance!.team_h_score,
      team_a_score: performance!.team_a_score,
      kickoff_time: performance!.kickoff_time,
    };

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
        <Typography fontSize={26} component="h3">
          {playerName}
        </Typography>
        <Box sx={{ display: "flex", alginItems: "center" }}>
          {renderResult(customResult, true, teams)}
        </Box>
      </Box>
    );
  };

  const stats = _.pickBy(
    performance,
    (value, key) => !!(elementStats.find((el) => el.name === key) && value > 0)
  );

  const renderStatsTable = (): JSX.Element => {
    return (
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Statistic</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(stats).map((stat, key) => {
              return (
                <TableRow key={key}>
                  <TableCell>{elementStats.find((el) => el.name === stat)?.label}</TableCell>
                  <TableCell>{stats[stat]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
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
          {selectedPlayer && performance ? (
            <>
              {renderHeader()}
              {renderStatsTable()}
            </>
          ) : (
            <Loading message="Getting performance details.."></Loading>
          )}
        </Box>
      </Box>
    </Box>
  );
}
