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
import { CustomResult, Player, PlayerStat, Team } from "types";
import { Close } from "@mui/icons-material";
import { getPlayerData } from "api/fpl_api_provider";
import { useQuery } from "react-query";
import Loading from "components/layout/loading";
import { renderResult } from "components/results/results";
import _ from "lodash";

interface PlayerPerformanceModalProps {
  isPlayerPerformanceModalOpen: boolean;
  setPlayerPerformanceModalOpen: (value: boolean) => void;
  selectedPlayer: Player;
  elementStats: PlayerStat[];
  teams: Team[];
}

export default function PlayerPerformanceModal({
  isPlayerPerformanceModalOpen: isPlayerInfoModalOpen,
  setPlayerPerformanceModalOpen: setPlayerInfoModalOpen,
  selectedPlayer,
  elementStats,
  teams,
}: PlayerPerformanceModalProps): JSX.Element {
  const { data: playerInfo } = useQuery([selectedPlayer], async () => {
    return getPlayerData(selectedPlayer.id);
  });

  const playerPerformance = playerInfo?.history.slice(-1)[0];

  const renderHeader = (): JSX.Element => {
    const playerName = `${selectedPlayer.first_name.toUpperCase()} ${selectedPlayer.second_name.toUpperCase()}`;
    let customResult: CustomResult | null = null;
    if (playerPerformance) {
      customResult = {
        team_h: playerPerformance.was_home ? selectedPlayer.team : playerPerformance.opponent_team,
        team_a: playerPerformance.was_home ? playerPerformance.opponent_team : selectedPlayer.team,
        team_h_score: playerPerformance.team_h_score,
        team_a_score: playerPerformance.team_a_score,
        kickoff_time: playerPerformance.kickoff_time,
      };
    }

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          rowGap: 2,
          width: "100%",
        }}
      >
        <Typography variant="h4">{playerName}</Typography>
        <Box sx={{ display: "flex", alginItems: "center", width: "80%" }}>
          {!!customResult && renderResult(customResult, true, teams)}
        </Box>
      </Box>
    );
  };

  const stats = _.pickBy(
    playerPerformance,
    (value, key) => !!(elementStats.find((el) => el.name === key) && value > 0)
  );

  const headerStyling = { backgroundColor: "rgb(224, 224, 224)" };

  const renderStatsTable = (): JSX.Element => {
    return (
      <TableContainer component={Box}>
        <Table size="small">
          <TableHead>
            <TableRow sx={headerStyling}>
              <TableCell>
                <Typography sx={{ fontWeight: 700 }}>Statistic</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 700 }}>Value</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(stats).map((stat, key) => {
              return (
                <TableRow key={key}>
                  <TableCell>
                    <Typography>{elementStats.find((el) => el.name === stat)?.label}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{stats[stat]}</Typography>
                  </TableCell>
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
          {selectedPlayer && playerPerformance ? (
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
