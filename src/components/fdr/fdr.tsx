import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { getGameweekFixtures } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import { gameStatusValues } from "helpers";
import _ from "lodash";
import { AppData, Fixture, Player, Team } from "types";

import { Notifier } from "components/layout";

import DifficultyLegend from "./difficulty_legend";
import FixtureBox from "./fixture_box";

export type BaseItem = Player | Team;

interface FdrTableProps {
  players?: Player[];
}

export default function FdrTable({ players }: FdrTableProps): JSX.Element {
  const [nextFiveGameweekFixtures, setNextFiveFixtures] = useState<Fixture[][]>([]);
  const [fdrStatus, setFdrStatus] = useState<string>("Fetching fixture data..");
  const appData = useContext(AppDataContext) as AppData;
  const { teams } = appData;
  const baseItem = players || teams;
  const nameColumnTitle = players ? "Player" : "Team";
  const allGameweeks = appData.events;
  const nextGameweek = allGameweeks.find((gw) => gw.is_next);
  const nextFiveGameweeks: number[] = [];

  if (nextGameweek) {
    // eslint-disable-next-line no-loops/no-loops
    for (let x = nextGameweek.id; x <= 38 && nextFiveGameweeks.length < 5; x++) {
      nextFiveGameweeks.push(x);
    }
  }

  useEffect(() => {
    const fetchNextFiveGameweekFixtures = async (): Promise<void> => {
      const nextFiveGameweekFixtures: Fixture[][] = await Promise.all(
        nextFiveGameweeks.map((gameweek) => getGameweekFixtures(gameweek))
      );

      setNextFiveFixtures(nextFiveGameweekFixtures);

      if (_.isEmpty(nextFiveGameweekFixtures)) {
        setFdrStatus(gameStatusValues.SEASON_FINISHED);
      }
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
        data-testid={testId}
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: 1,
          ml: 0.5,
          whiteSpace: "nowrap"
        }}
      >
        <img
          alt='crest-img'
          height='22px'
          src={`${process.env.PUBLIC_URL}/assets/images/crests/${teamId}.png`}
        />
        <Box
          sx={{
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
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
    const teamId = players ? (baseItem as Player).team : (baseItem as Team).id;

    return fixtures.map((gameweek) => {
      return gameweek.filter((f) => f.team_h === teamId || f.team_a === teamId);
    });
  };

  const renderRow = (baseItem: BaseItem, index: number): JSX.Element => {
    const teamFixtures = getNextFiveTeamFixtures(baseItem, nextFiveGameweekFixtures);
    const testId = `fixture-row-${baseItem.id}`;

    return (
      <TableRow
        data-testid={testId}
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component='th' key={index} scope='row'>
          {renderBaseItemName(baseItem)}
        </TableCell>
        {_.map(teamFixtures, (fixtures, key) => (
          <FixtureBox
            baseItem={baseItem}
            fixtures={fixtures}
            getTeamById={getTeamById}
            isPlayerTable={!!players}
            key={key}
          />
        ))}
      </TableRow>
    );
  };

  return _.isEmpty(nextFiveGameweekFixtures)
    ? (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Notifier message={fdrStatus} type={fdrStatus === gameStatusValues.SEASON_FINISHED ? "warning" : ""} />
      </Box>
    )
    : (
      <Box
        alignItems='center'
        data-testid='fdr-container'
        display='flex'
        flexDirection='column'
        height='100%'
        justifyContent='center'
        overflow='hidden'
        sx={{ "& .MuiTableContainer-root": { height: "100%" } }}
      >
        <DifficultyLegend />
        <TableContainer>
          <Table
            aria-label='fdr table'
            sx={{
              tableLayout: "fixed",
              height: "100%",
              flexGrow: "1",
              "& .MuiTableCell-root": { padding: "2px 4px" }
            }}
          >
            <TableHead>
              <TableRow data-testid='table-head-column-title'>
                <TableCell sx={{ textAlign: "center" }}>{nameColumnTitle}</TableCell>
                {nextFiveGameweeks.map((gameweekNumber, index) => (
                  <TableCell key={index} sx={{ textAlign: "center" }}>
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
