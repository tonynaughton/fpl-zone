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
import { GAME_STATUS_VALUES, getLocalImage } from "helpers";
import { useNextFiveGameweekIds } from "hooks/use_next_five_gameweek_ids";
import { isEmpty, map } from "lodash";
import { AppData, Fixture as FixtureType, Player, Team } from "types";

import { Notifier } from "components/layout";

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

  const baseItemCellWidth = "20%";

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
        alignItems='center'
        data-testid={`base-item-${name}`}
        display='flex'
        gap={1}
        marginLeft={0.5}
        whiteSpace='nowrap'
      >
        <img
          alt='crest-img'
          data-testid={`team-crest-img-${name}`}
          height='22px'
          src={getLocalImage(`crests/${teamId}.png`)}
        />
        <Box overflow='hidden'>
          <Typography className='text-ellipsis' fontWeight={500} variant='body1'>
            {name.toUpperCase()}
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
      <TableRow data-testid={`fixture-row-${baseItem.id}`} key={index}>
        <TableCell
          key={index}
          scope='row'
          sx={{
            p: 0,
            backgroundColor: "rgba(240, 240, 240, 1)",
            border: "1px solid rgba(200, 200, 200, 1)"
          }}
          width={baseItemCellWidth}
        >
          {renderBaseItemName(baseItem)}
        </TableCell>
        {map(teamFixtures, (fixtures, key) => (
          <TableCell
            key={key}
            sx={{
              p: 0,
              border: "0.2px solid #4d4d4d"
            }}
          >
            <Fixture
              baseItem={baseItem}
              fixtures={fixtures}
              isPlayerTable={!!players}
            />
          </TableCell>
        ))}
      </TableRow>
    );
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
              flexGrow: "1"
            }}
          >
            <TableHead>
              <TableRow data-testid='table-head-column-title'>
                <TableCell
                  sx={{
                    height: "5vh",
                    p: 0,
                    backgroundColor: "rgba(240, 240, 240, 1)",
                    border: "1px solid rgba(200, 200, 200, 1)"
                  }}
                  width={baseItemCellWidth}
                />
                {nextFiveGameweekIds.map((gameweekNumber, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      height: "5vh",
                      p: 0,
                      backgroundColor: "rgba(240, 240, 240, 1)",
                      border: "1px solid rgba(200, 200, 200, 1)"
                    }}
                  >
                    <Typography textAlign='center'>GW {gameweekNumber}</Typography>
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
