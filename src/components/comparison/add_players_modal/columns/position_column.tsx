import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { getPositionById } from "helpers";
import { AppData,Player } from "types";

import { renderHeader } from "../add_players_table";

export const PositionColumn = (): GridColDef => {
  const { positions } = useContext(AppDataContext) as AppData;

  const sortComparator = (p1: Player, p2: Player): number => p1.element_type - p2.element_type;

  const renderCell = (props: GridRenderCellParams<Player>): JSX.Element => {
    const { value: player } = props;

    if (!player) return <></>;

    const pos = getPositionById(player?.element_type, positions);

    return <Typography className='text-ellipsis'>{pos.singular_name_short}</Typography>;
  };

  return {
    field: "position",
    headerName: "Position",
    flex: 0.5,
    renderCell,
    renderHeader,
    sortComparator
  };
};
