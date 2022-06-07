import React, { Fragment, useContext } from "react";
import { useQuery } from "react-query";
import { Close } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { getPlayerData } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import _ from "lodash";
import {
  AppData,
  CustomResult,
  Gameweek,
  Player,
  PlayerPerformance,
  PlayerStat,
  Team
} from "types";

import { Notifier } from "components/layout";
import { RenderResult } from "components/results/result";

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
  teams
}: PlayerPerformanceModalProps): JSX.Element {
  const { data: playerInfo, isLoading: fetchingPlayerInfo } = useQuery(
    [selectedPlayer],
    () => getPlayerData(selectedPlayer.id)
  );

  const appData = useContext(AppDataContext) as AppData;
  const currentGameweek = appData.events.find((event) => event.is_current) as Gameweek;
  const playerPerformances = playerInfo?.history.filter(
    (fixture) => fixture.round === currentGameweek.id
  );
  const playerName = `${selectedPlayer.first_name.toUpperCase()} ${selectedPlayer.second_name.toUpperCase()}`;

  const renderPlayerPerformance = (performance: PlayerPerformance, key: number): JSX.Element => {
    const customResult: CustomResult = {
      team_h: performance.was_home ? selectedPlayer.team : performance.opponent_team,
      team_a: performance.was_home ? performance.opponent_team : selectedPlayer.team,
      team_h_score: performance.team_h_score,
      team_a_score: performance.team_a_score,
      kickoff_time: performance.kickoff_time
    };
    const matchStarted: boolean = new Date(performance.kickoff_time) < new Date();
    const stats = _.pickBy(
      performance,
      (value, key) => !!(elementStats.find((el) => el.name === key) && value > 0)
    );

    return (
      <Fragment key={key}>
        <Box sx={{ display: "flex", alginItems: "center", width: "80%" }}>
          {RenderResult(customResult, matchStarted, teams)}
        </Box>
        {matchStarted && (
          <TableContainer component={Box} key={key}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgb(224, 224, 224)" }}>
                  <TableCell>
                    <Typography>Statistic</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Value</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(stats).map((stat, key) => {
                  return (
                    <TableRow key={key}>
                      <TableCell>
                        <Typography>
                          {elementStats.find((el) => el.name === stat)?.label}
                        </Typography>
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
        )}
      </Fragment>
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
        backgroundColor: "rgb(0, 0, 0, 0.5)"
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
          maxHeight: "75%",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          flexDirection: "column",
          alignItems: "center",
          rowGap: "1em",
          zIndex: 2000,
          overflow: "scroll"
        }}
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
            rowGap: 3
          }}
        >
          {fetchingPlayerInfo
            ? (
              <Notifier message='Getting performance details..' />
            )
            : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  rowGap: 2,
                  width: "100%"
                }}
              >
                <Typography variant='h3'>{playerName}</Typography>
                {playerPerformances && playerPerformances?.length > 0
                  ? (
                    playerPerformances.map((performance, key) => renderPlayerPerformance(performance, key))
                  )
                  : (
                    <Typography>No fixtures</Typography>
                  )}
              </Box>
            )}
        </Box>
      </Box>
    </Box>
  );
}
