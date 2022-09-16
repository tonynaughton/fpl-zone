import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import { getGameweekFixtures } from "api/fpl_api_provider";
import { AppDataContext } from "app_content";
import { useNextTeamFixtures } from "hooks";
import { useRemainingGameweekIds } from "hooks/use_next_gameweek_ids";
import { isEmpty, map } from "lodash";
import { AppData, Fixture as FixtureType, Player, Team } from "types";

import { Notifier, notifierMessageMap as msgMsg, NotifierType } from "components/layout";
import { BaseItemWithCrest } from "components/results/base_item_with_crest";

import { Fixture } from "./fixture";

// FDR can display fixtures for players or teams
export type BaseItem = Player | Team;

interface FdrTableProps {
  players?: Player[];
}

interface NextTeamFixturesProps {
  item: BaseItem;
}

export default function FdrTable({ players }: FdrTableProps): JSX.Element {
  const theme = useTheme();
  const [nextFixtures, setNextFixtures] = useState<FixtureType[][]>([]);
  const [notifierMessage, setNotifierMessage] = useState<string>("Fetching fixture data..");
  const [notifierType, setNotifierType] = useState<NotifierType>("loading");
  const { teams, isMobile } = useContext(AppDataContext) as AppData;
  const baseItem = players || teams;
  const nextGameweekIds = useRemainingGameweekIds();

  const stickyCellStyle = {
    px: 1,
    width: isMobile ? "8rem" : "10rem",
    maxWidth: isMobile ? "8rem" : "10rem",
    position: "sticky",
    left: 0,
    bgcolor: theme.palette.info.main,
    boxShadow: "-0.5px 0 inset black"
  };

  useEffect(() => {
    const fetchNextGameweekFixtures = async (): Promise<void> => {
      if (isEmpty(nextGameweekIds)) {
        setNotifierMessage(msgMsg.seasonFinished);
        setNotifierType("error");

        return;
      }

      const nextGameweekFixtures: FixtureType[][] = await Promise.all(
        nextGameweekIds.map((gameweek) => getGameweekFixtures(gameweek))
      );

      setNextFixtures(nextGameweekFixtures);
    };

    fetchNextGameweekFixtures();
  }, []);

  const TeamFixturesRow = ({ item }: NextTeamFixturesProps): JSX.Element => {
    const teamFixtures = useNextTeamFixtures(item, nextFixtures);

    return (
      <TableRow
        data-testid={`fixture-row-${item.id}`}
        sx={{
          "& .MuiTableCell-root:first-of-type": stickyCellStyle
        }}
      >
        <TableCell>
          <BaseItemWithCrest abbreviateTeam={isMobile} item={item} />
        </TableCell>
        {map(teamFixtures, (fixtures, key) => (
          <TableCell key={key}>
            <Fixture baseItem={item} fixtures={fixtures} />
          </TableCell>
        ))}
      </TableRow>
    );
  };

  if (isEmpty(nextFixtures)) {
    return <Notifier message={notifierMessage} type={notifierType} />;
  }

  return (
    <Box
      className='flex-center'
      data-testid='fdr-container'
      flexDirection='column'
      height='100%'
      sx={{ "& .MuiTableContainer-root": { height: "100%" } }}
      width='100%'
    >
      <TableContainer
        sx={{
          overflowY: "hidden",
          "&::-webkit-scrollbar": {
            width: 1
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "white",
            border: "0.5px solid black"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            border: "0.5px solid black"
          }
        }}
      >
        <Table
          sx={{
            height: "100%",
            "& .MuiTableCell-root": {
              p: 0,
              border: "0.5px solid black"
            }
          }}
        >
          <TableHead>
            <TableRow
              data-testid='table-head-column-title'
              sx={{ "& .MuiTableCell-root": { height: "6vh" } }}
            >
              <TableCell sx={stickyCellStyle} />
              {nextGameweekIds.map((gameweekNumber, index) => (
                <TableCell key={index}>
                  <Typography textAlign='center'>GW {gameweekNumber}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {baseItem.map((item: BaseItem, key: number) => <TeamFixturesRow item={item} key={key} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
