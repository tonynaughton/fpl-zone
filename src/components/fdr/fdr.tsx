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
import { GAME_STATUS_VALUES } from "helpers";
import { useNextFiveGameweekIds } from "hooks/use_next_five_gameweek_ids";
import { isEmpty, map } from "lodash";
import { AppData, Fixture as FixtureType, Player, Team } from "types";

import { Notifier } from "components/layout";

import DifficultyLegend from "./difficulty_legend";
import { Fixture } from "./fixture";

// FDR can display fixtures for players or teams
export type BaseItem = Player | Team;

interface FdrTableProps {
  players?: Player[];
}

export default function FdrTable({ players }: FdrTableProps): JSX.Element {
  const [nextFiveGameweekFixtures, setNextFiveFixtures] = useState<FixtureType[][]>([]);
  const [fdrStatus, setFdrStatus] = useState<string>("Fetching fixture data..");

  const { teams } = useContext(AppDataContext) as AppData;

  const baseItem = players || teams;
  const nameColumnTitle = players ? "Player" : "Team";

  const nextFiveGameweekIds = useNextFiveGameweekIds();

  useEffect(() => {
    const fetchNextFiveGameweekFixtures = async (): Promise<void> => {
      const nextFiveGameweekFixtures: FixtureType[][] = await Promise.all(
        nextFiveGameweekIds.map((gameweek) => getGameweekFixtures(gameweek))
      );

      if (isEmpty(nextFiveGameweekFixtures)) {
        setFdrStatus(GAME_STATUS_VALUES.SEASON_FINISHED);
      }

      setNextFiveFixtures(nextFiveGameweekFixtures);
    };

    fetchNextFiveGameweekFixtures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBaseItemName = (baseItem: BaseItem): JSX.Element => {
    const name = players ? (baseItem as Player).web_name : (baseItem as Team).name;
    const teamId = players ? (baseItem as Player).team_code : (baseItem as Team).code;

    return (
      <Box
        data-testid={`base-item-${name}`}
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
          data-testid={`team-crest-img-${name}`}
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

  const getNextFiveTeamFixtures = (baseItem: BaseItem, fixtures: FixtureType[][]): FixtureType[][] => {
    const teamId = players ? (baseItem as Player).team : (baseItem as Team).id;

    return fixtures.map((gameweek) => {
      return gameweek.filter((f) => f.team_h === teamId || f.team_a === teamId);
    });
  };

  const renderRow = (baseItem: BaseItem, index: number): JSX.Element => {
    const teamFixtures = getNextFiveTeamFixtures(baseItem, nextFiveGameweekFixtures);

    return (
      <TableRow
        data-testid={`fixture-row-${baseItem.id}`}
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component='th' key={index} scope='row'>
          {renderBaseItemName(baseItem)}
        </TableCell>
        {map(teamFixtures, (fixtures, key) => (
          <Fixture
            baseItem={baseItem}
            fixtures={fixtures}
            isPlayerTable={!!players}
            key={key}
          />
        ))}
      </TableRow>
    );
  };

  return isEmpty(nextFiveGameweekFixtures)
    ? (
      <Box
        data-testid='notifier-container'
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
      >
        <Notifier message={fdrStatus} type={fdrStatus === GAME_STATUS_VALUES.SEASON_FINISHED ? "warning" : "loading"} />
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
                {nextFiveGameweekIds.map((gameweekNumber, index) => (
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
