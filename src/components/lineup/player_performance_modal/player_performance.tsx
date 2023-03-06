import React, { useContext } from "react";
import { Box, Table, TableBody,TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { pickBy } from "lodash";
import { AppData, Performance, Player } from "types";

import { Result } from "components/results/result";

interface PlayerPerformanceProps {
  player: Player;
  performance: Performance;
}

export const PlayerPerformance = ({ player, performance }: PlayerPerformanceProps): JSX.Element => {
  const { playerStats, teams } = useContext(AppDataContext) as AppData;
  const theme = useTheme();

  const homeTeamCode = performance.was_home ? player.team : performance.opponent_team;
  const homeTeam = getTeamById(homeTeamCode, teams);

  const awayTeamCode = performance.was_home ? performance.opponent_team : player.team;
  const awayTeam = getTeamById(awayTeamCode, teams);

  const kickOff = new Date(performance.kickoff_time);

  const matchStarted = kickOff < new Date();
  const stats = pickBy(
    performance,
    (value, key) => !!(playerStats.find((el) => el.name === key) && value > 0)
  );

  return (
    <>
      <Box className='flex-center' width='90%'>
        <Result
          awayScore={performance.team_a_score}
          awayTeam={awayTeam}
          homeScore={performance.team_h_score}
          homeTeam={homeTeam}
          kickOff={kickOff}
        />
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
