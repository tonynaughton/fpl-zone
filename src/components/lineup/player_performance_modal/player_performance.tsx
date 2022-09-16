import React, { useContext } from "react";
import { Box, Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { pickBy } from "lodash";
import { AppData, CustomResult, Player,PlayerPerformance as PlayerPerformanceType } from "types";

import { Result } from "components/results/result";

interface PlayerPerformanceProps {
  player: Player;
  performance: PlayerPerformanceType;
}

export const PlayerPerformance = ({ player, performance }: PlayerPerformanceProps): JSX.Element => {
  const { playerStats } = useContext(AppDataContext) as AppData;
  const theme = useTheme();

  const customResult: CustomResult = {
    team_h: performance.was_home ? player.team : performance.opponent_team,
    team_a: performance.was_home ? performance.opponent_team : player.team,
    team_h_score: performance.team_h_score,
    team_a_score: performance.team_a_score,
    kickoff_time: performance.kickoff_time
  };
  const matchStarted: boolean = new Date(performance.kickoff_time) < new Date();
  const stats = pickBy(
    performance,
    (value, key) => !!(playerStats.find((el) => el.name === key) && value > 0)
  );

  return (
    <>
      <Box className='flex-center' width='90%'>
        <Result matchStarted={matchStarted} result={customResult} />
      </Box>
      {matchStarted && (
        <TableContainer component={Box}>
          <Table
            sx={{
              "& .MuiTableCell-root": {
                pl: "0.8vw", pr: "0.8vw", pt: "1vh", pb: "1vh"
              }
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.highlight.main }}>
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
                        {playerStats.find((el) => el.name === stat)?.label}
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
    </>
  );
};
