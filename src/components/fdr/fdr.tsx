import React from "react";
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
import { Fixture, Gameweek, Player, Team } from "types";
import _ from "lodash";
import FixtureBox from "./fixture_box";
import DifficultyLegend from "./difficulty_legend";
import Loading from "components/layout/loading";

export type BaseItem = Player | Team;

interface FdrTableProps {
  currentGameweek: Gameweek;
  type: BaseItem[];
  teams: Team[];
}

interface FdrTableState {
  nextFiveGameweekFixtures: Fixture[][];
}

export default class FdrTable extends React.Component<FdrTableProps, FdrTableState> {
  public isPlayerTable: boolean;
  public baseItem: BaseItem[];
  public nameColumnTitle: string;
  public nextFiveGameweeks: number[];

  public constructor(props: FdrTableProps) {
    super(props);

    this.isPlayerTable = "web_name" in this.props.type[0];
    this.baseItem = this.isPlayerTable
      ? (this.props.type as Player[])
      : (this.props.type as Team[]);
    this.nameColumnTitle = this.isPlayerTable ? "Player" : "Team";
    this.nextFiveGameweeks = Array(5)
      .fill(this.props.currentGameweek.id + 1)
      .map((e, i) => e + i);

    this.state = {
      nextFiveGameweekFixtures: [],
    };
  }

  public renderBaseItemName = (baseItem: BaseItem): JSX.Element => {
    const name = this.isPlayerTable ? (baseItem as Player).web_name : (baseItem as Team).name;
    const teamId = this.isPlayerTable ? (baseItem as Player).team_code : (baseItem as Team).code;
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
          <Typography variant="body2">{name}</Typography>
        </Box>
      </Box>
    );
  };

  public getTeamById = (teamId: number): string | undefined => {
    const team = this.props.teams.find((t) => t.id === teamId);
    return team?.short_name;
  };

  public async fetchNextFiveGameweekFixtures(): Promise<Fixture[][]> {
    const nextFiveGameweekFixtures: Fixture[][] = [];
    // For loop must be used as async await cannot be used in a forEach loop
    // eslint-disable-next-line no-loops/no-loops
    for (const gameweek of this.nextFiveGameweeks) {
      await getGameweekFixtures(gameweek).then((fixtures) => {
        nextFiveGameweekFixtures.push(fixtures);
      });
    }
    return nextFiveGameweekFixtures;
  }

  public componentDidMount = async (): Promise<void> => {
    await this.fetchNextFiveGameweekFixtures().then((nextFiveGameweekFixtures) => {
      this.setState({ nextFiveGameweekFixtures });
    });
  };

  public getNextFiveTeamFixtures = (baseItem: BaseItem, fixtures: Fixture[][]): Fixture[][] => {
    const fixturesByTeam: Fixture[][] = [];
    const teamId = this.isPlayerTable ? (baseItem as Player).team : (baseItem as Team).id;
    fixtures.forEach((gameweek) => {
      const teamFixtures = gameweek.filter((f) => f.team_h === teamId || f.team_a === teamId);
      fixturesByTeam.push([...teamFixtures]);
    });
    return fixturesByTeam;
  };

  public renderRow = (baseItem: BaseItem, index: number): JSX.Element => {
    const teamFixtures = this.getNextFiveTeamFixtures(
      baseItem,
      this.state.nextFiveGameweekFixtures
    );
    const testId = `fixture-row-${baseItem.id}`;
    return (
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        data-testid={testId}
      >
        <TableCell component="th" scope="row" key={index}>
          {this.renderBaseItemName(baseItem)}
        </TableCell>
        {_.map(teamFixtures, (fixtures, key) => (
          <FixtureBox
            fixtures={fixtures}
            baseItem={baseItem}
            isPlayerTable={this.isPlayerTable}
            key={key}
            getTeamById={this.getTeamById}
          />
        ))}
      </TableRow>
    );
  };

  public render(): JSX.Element {
    return _.isEmpty(this.state.nextFiveGameweekFixtures) ? (
      <Loading message="Fetching fixture data.." />
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
                <TableCell sx={{ textAlign: "center" }}>{this.nameColumnTitle}</TableCell>
                {this.nextFiveGameweeks.map((gameweekNumber, index) => (
                  <TableCell sx={{ textAlign: "center" }} key={index}>
                    GW {gameweekNumber}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.baseItem.map((item: BaseItem, key: number) => this.renderRow(item, key))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}
