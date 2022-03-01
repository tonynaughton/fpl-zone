import React from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { getGameweekFixtures } from "api/fpl_api_provider";
import { Fixture, Gameweek, Player, Team } from "types";
import _ from "lodash";

interface FdrTableProps {
  currentGameweek: Gameweek;
  type: Player[] | Team[];
  teams: Team[];
}

interface FdrTableState {
  nextFiveGameweekFixtures: Fixture[][];
}

export default class FdrTable extends React.Component<FdrTableProps, FdrTableState> {
  public isPlayerTable: boolean;
  public baseItem: Player[] | Team[];
  public names: string[];
  public nameColumnTitle: string;
  public nextFiveGameweeks: number[];

  public constructor(props: FdrTableProps) {
    super(props);

    this.isPlayerTable = "web_name" in this.props.type[0];
    this.baseItem = this.isPlayerTable
      ? (this.props.type as Player[])
      : (this.props.type as Team[]);
    this.names = [];
    this.baseItem.forEach((p) => this.names.push(p.web_name));
    this.nameColumnTitle = this.isPlayerTable ? "Player" : "Team";
    this.nextFiveGameweeks = Array(5)
      .fill(this.props.currentGameweek.id + 1)
      .map((e, i) => e + i);

    this.state = {
      nextFiveGameweekFixtures: [],
    };
  }

  public componentDidMount = async (): Promise<void> => {
    const nextFiveGameweekFixtures: Fixture[][] = [];
    this.nextFiveGameweeks.forEach(async (gameweek) => {
      const fixtures = await getGameweekFixtures(gameweek);
      nextFiveGameweekFixtures.push(fixtures);
    });
    this.setState({ nextFiveGameweekFixtures });
  };

  public getNextFiveTeamFixtures = (baseItem: Player | Team): number[][] => {
    if (this.state.nextFiveGameweekFixtures === []) {
      return [];
    }

    const fixturesByTeam: Fixture[][] = [];
    this.state.nextFiveGameweekFixtures.forEach((gameweek) => {
      const teamFixtures = gameweek.filter(
        (f) => f.team_h === baseItem.id || f.team_a === baseItem.id
      );
      fixturesByTeam.push([...teamFixtures]);
    });

    const oppositionsIds: number[][] = [];
    fixturesByTeam.forEach((f) => {
      const ids = f.map((f) => (f.team_h === baseItem.id ? f.team_a : f.team_h));
      oppositionsIds.push(ids);
    });
    return oppositionsIds;
  };

  public renderBaseItemName = (baseItem: Player | Team): string => {
    return "web_name" in baseItem ? baseItem.web_name : baseItem.name;
  };

  public getTeamAbbreviationById = (teamId: number): string | undefined => {
    const team = this.props.teams.find((t) => t.id === teamId);
    return team?.short_name;
  };

  public renderRow = (baseItem: Player | Team, index: number): JSX.Element => {
    const teamIds = this.getNextFiveTeamFixtures(baseItem);
    return (
      <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row" key={index}>
          {this.renderBaseItemName(baseItem)}
        </TableCell>
        {_.map(teamIds, (gameweek) =>
          _.map(gameweek, (teamId, key) => (
            <TableCell key={key}>{this.getTeamAbbreviationById(teamId)}</TableCell>
          ))
        )}
      </TableRow>
    );
  };

  public renderTableBody = (): JSX.Element => {
    const fixtures = this.state.nextFiveGameweekFixtures;
    if (_.isEmpty(fixtures)) {
      return <></>;
    } else {
      return (
        <>{this.baseItem.map((item: Player | Team, key: number) => this.renderRow(item, key))}</>
      );
    }
  };

  public render(): JSX.Element {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="fdr table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>{this.nameColumnTitle}</TableCell>
              {this.nextFiveGameweeks.map((gameweekNumber, index) => (
                <TableCell key={index}>{gameweekNumber}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{this.renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}
