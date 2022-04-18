import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from "@mui/material";
import { getGameweekFixtures } from "api/fpl_api_provider";
import { AppData, Fixture, Gameweek, Player, Team } from "types";
import _ from "lodash";
import FixtureBox from "./fixture_box";
import DifficultyLegend from "./difficulty_legend";
import { LoadingMessage } from "components/layout";
import { AppDataContext } from "app_content";

export type BaseItem = Player | Team;

interface FdrTableProps {
  players?: Player[];
}

export default function FdrTable({ players }: FdrTableProps): JSX.Element {
  const [nextFiveGameweekFixtures, setNextFiveFixtures] = useState<Fixture[][]>([]);
  const appData = useContext(AppDataContext) as AppData;
  const teams = appData.gameData.teams;
  const baseItem = players || teams;
  const nameColumnTitle = players ? "Player" : "Team";
  const allGameweeks = appData.gameData.events;
  const currentGameweek = allGameweeks.find((gw) => gw.is_current) as Gameweek;
  const nextFiveGameweeks: number[] = [];
  // eslint-disable-next-line no-loops/no-loops
  for (let x = currentGameweek.id; x <= 38 && nextFiveGameweeks.length < 5; x++) {
    nextFiveGameweeks.push(x);
  }

  useEffect(() => {
    const fetchNextFiveGameweekFixtures = async (): Promise<void> => {
      const nextFiveGameweekFixtures: Fixture[][] = [];
      // eslint-disable-next-line no-loops/no-loops
      for (const gameweek of nextFiveGameweeks) {
        await getGameweekFixtures(gameweek).then((fixtures) => {
          nextFiveGameweekFixtures.push(fixtures);
        });
      }
      setNextFiveFixtures(nextFiveGameweekFixtures);
    };

    fetchNextFiveGameweekFixtures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBaseItemName = (baseItem: BaseItem): JSX.Element => {
    const name = players ? (baseItem as Player).web_name : (baseItem as Team).name;
    const teamId = players ? (baseItem as Player).team_code : (baseItem as Team).code;
    const testId = `base-item-${name}`;
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: 1,
          ml: 0.5,
          whiteSpace: "nowrap",
        }}
        data-testid={testId}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/crests/${teamId}.png`}
          alt="crest-img"
          height="22px"
        />
        <Box
          sx={{
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {name}
          </Typography>
        </Box>
      </Box>
    );
  };

  const getTeamById = (teamId: number): string | undefined => {
    const team = teams.find((t) => t.id === teamId);
    return team?.short_name;
  };

  const getNextFiveTeamFixtures = (baseItem: BaseItem, fixtures: Fixture[][]): Fixture[][] => {
    const fixturesByTeam: Fixture[][] = [];
    const teamId = players ? (baseItem as Player).team : (baseItem as Team).id;
    fixtures.forEach((gameweek) => {
      const teamFixtures = gameweek.filter((f) => f.team_h === teamId || f.team_a === teamId);
      fixturesByTeam.push([...teamFixtures]);
    });
    return fixturesByTeam;
  };

  const renderRow = (baseItem: BaseItem, index: number): JSX.Element => {
    const teamFixtures = getNextFiveTeamFixtures(baseItem, nextFiveGameweekFixtures);
    const testId = `fixture-row-${baseItem.id}`;
    return (
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        data-testid={testId}
      >
        <TableCell component="th" scope="row" key={index}>
          {renderBaseItemName(baseItem)}
        </TableCell>
        {_.map(teamFixtures, (fixtures, key) => (
          <FixtureBox
            fixtures={fixtures}
            baseItem={baseItem}
            isPlayerTable={!!players}
            key={key}
            getTeamById={getTeamById}
          />
        ))}
      </TableRow>
    );
  };

  return _.isEmpty(nextFiveGameweekFixtures) ? (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <LoadingMessage message="Fetching fixture data.." />
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      height="100%"
      sx={{ "& .MuiTableContainer-root": { height: "100%" } }}
      data-testid="fdr-container"
    >
      <DifficultyLegend />
      <TableContainer>
        <Table
          aria-label="fdr table"
          sx={{
            tableLayout: "fixed",
            height: "100%",
            flexGrow: "1",
            "& .MuiTableCell-root": { padding: "2px 4px" },
          }}
        >
          <TableHead>
            <TableRow data-testid="table-head-column-title">
              <TableCell sx={{ textAlign: "center" }}>{nameColumnTitle}</TableCell>
              {nextFiveGameweeks.map((gameweekNumber, index) => (
                <TableCell sx={{ textAlign: "center" }} key={index}>
                  GW {gameweekNumber}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {baseItem.map((item: BaseItem, key: number) => renderRow(item, key))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
