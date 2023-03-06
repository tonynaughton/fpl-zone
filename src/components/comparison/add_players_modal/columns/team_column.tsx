import React, { useContext } from "react";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { AppData,Player } from "types";

import { BaseItemWithCrest } from "components/results/base_item_with_crest";

import { renderHeader } from "../add_players_table";

export const TeamColumn = (): GridColDef => {
  const { teams, isMobile } = useContext(AppDataContext) as AppData;

  const sortComparator = (p1: Player, p2: Player): number => (
    getTeamById(p1.team, teams).name.localeCompare(getTeamById(p2.team, teams).name)
  );

  const renderCell = (props: GridRenderCellParams<Player>): JSX.Element => {
    const { value: player } = props;

    if (!player) return <></>;

    const team = getTeamById(player.team, teams);

    return <BaseItemWithCrest crestOnly={isMobile} item={team} />;
  };

  return {
    field: "team",
    headerName: "Team",
    flex: isMobile ? 0.2 : 0.5,
    renderCell,
    renderHeader,
    sortComparator
  };
};
