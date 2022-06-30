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

import { BaseItemName } from "./base_item_name";
import { Fixture } from "./fixture";

// FDR can display fixtures for players or teams
export type BaseItem = Player | Team;

interface FdrTableProps {
  players?: Player[];
}

export const FDR_COLOURS = {
  1: "#09BA59",
  2: "#93E02D",
  3: "#F5CF38",
  4: "#DE7628",
  5: "#FF193C"
};

export default function FdrTable({ players }: FdrTableProps): JSX.Element {
  const [nextFiveGameweekFixtures, setNextFiveFixtures] = useState<FixtureType[][]>([]);
  const [fdrStatus, setFdrStatus] = useState<string>("Fetching fixture data..");

  const { teams } = useContext(AppDataContext) as AppData;

  const baseItem = players || teams;

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

  const getNextFiveTeamFixtures = (baseItem: BaseItem, fixtures: FixtureType[][]): FixtureType[][] => {
    const teamId = players ? (baseItem as Player).team : (baseItem as Team).id;

    return fixtures.map((gameweek) => {
      return gameweek.filter((f) => f.team_h === teamId || f.team_a === teamId);
    });
  };

  const baseItemCellWidth = "20%";
  const customCellStyle = {
    p: 0,
    bgcolor: "rgba(240, 240, 240, 1)",
    border: "1px solid rgba(200, 200, 200, 1)"
  };

  return isEmpty(nextFiveGameweekFixtures)
    ? (
      <Box className='flex-center' data-testid='notifier-container' height='100%'>
        <Notifier message={fdrStatus} type={fdrStatus === GAME_STATUS_VALUES.SEASON_FINISHED ? "warning" : "loading"} />
      </Box>
    )
    : (
      <Box
        className='flex-center'
        data-testid='fdr-container'
        flexDirection='column'
        height='100%'
        overflow='hidden'
        sx={{ "& .MuiTableContainer-root": { height: "100%" } }}
      >
        <TableContainer>
          <Table
            sx={{
              tableLayout: "fixed",
              height: "100%",
              flexGrow: "1",
              borderCollapse: "collapse"
            }}
          >
            <TableHead>
              <TableRow data-testid='table-head-column-title'>
                <TableCell
                  sx={{ height: "5vh", ...customCellStyle }}
                  width={baseItemCellWidth}
                />
                {nextFiveGameweekIds.map((gameweekNumber, index) => (
                  <TableCell key={index} sx={{ height: "5vh", ...customCellStyle }}>
                    <Typography textAlign='center'>GW {gameweekNumber}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {baseItem.map((item: BaseItem, key: number) => {
                const teamFixtures = getNextFiveTeamFixtures(item, nextFiveGameweekFixtures);

                return (
                  <TableRow data-testid={`fixture-row-${item.id}`} key={key}>
                    <TableCell
                      key={key}
                      scope='row'
                      sx={customCellStyle}
                      width={baseItemCellWidth}
                    >
                      <BaseItemName baseItem={item} />
                    </TableCell>
                    {map(teamFixtures, (fixtures, key) => (
                      <TableCell key={key} sx={{ p: 0, border: "0.5px solid black" }}>
                        <Fixture
                          baseItem={item}
                          fixtures={fixtures}
                          isPlayerTable={!!players}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
}
