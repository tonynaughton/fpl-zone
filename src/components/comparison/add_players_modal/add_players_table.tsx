import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { formatPrice } from "helpers";
import { AppData } from "types";

import { Notifier } from "components/layout";

import { MAX_PLAYER_COUNT } from "..";

import { PositionColumn } from "./columns/position_column";
import { TeamColumn } from "./columns/team_column";
import { CustomFooter } from "./footer";

interface AddPlayersTableProps {
  selectionModel: GridRowId[];
  searchInput: string;
  setSelectionModel: (ids: GridRowId[]) => void;
  onConfirmClick: () => void;
}

export const renderCell = (props: GridRenderCellParams<string>): JSX.Element => (
  <Typography className='text-ellipsis'>{props.value}</Typography>
);

export const renderHeader = (props: GridColumnHeaderParams<string>): JSX.Element => (
  <Typography className='text-ellipsis'>{props.colDef.headerName}</Typography>
);

export const AddPlayersTable = ({
  selectionModel,
  setSelectionModel,
  searchInput,
  onConfirmClick
}: AddPlayersTableProps): JSX.Element => {
  const { players, isMobile } = useContext(AppDataContext) as AppData;

  const rows = players.map((player) => ({
    id: player.id,
    name: isMobile ? player.web_name : `${player.first_name} ${player.second_name}`,
    team: player,
    position: player,
    price: formatPrice(player.now_cost),
    points: player.total_points
  }));

  const isRowSelectable = (params: GridRowParams): boolean => (
    selectionModel.length < MAX_PLAYER_COUNT || selectionModel.includes(params.id)
  );

  const posCol = PositionColumn();
  const teamCol = TeamColumn();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: isMobile ? 0.3 : 1, renderHeader, renderCell },
    teamCol,
    ...!isMobile
      ? [
        posCol,
        { field: "price", headerName: "Price", flex: 0.5, renderHeader, renderCell }
      ]
      : [],
    { field: "points", headerName: isMobile ? "Pts." : "Total Points", flex: isMobile ? 0.2 : 0.5, renderHeader, renderCell }
  ];

  const filterModel = {
    items: [{ columnField: "name", operatorValue: "contains", value: searchInput }]
  };


  return (
    <DataGrid
      checkboxSelection
      columns={columns}
      components={{
        NoRowsOverlay: () => <Notifier message='No players found..' type='warning' />,
        Footer: () => <CustomFooter onConfirmClick={onConfirmClick} />
      }}
      density='compact'
      disableColumnFilter
      disableColumnMenu
      filterModel={filterModel}
      hideFooterSelectedRowCount
      initialState={{
        sorting: {
          sortModel: [{ field: "points", sort: "desc" }]
        },
        pagination: {
          pageSize: 25
        }
      }}
      isRowSelectable={isRowSelectable}
      onSelectionModelChange={setSelectionModel}
      pagination
      rows={rows}
      rowsPerPageOptions={isMobile ? [] : [25, 50, 100]}
      selectionModel={selectionModel}
      sx={{
        "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within": {
          outline: "none"
        },
        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
          outline: "none"
        },
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
          display: "none"
        }
      }}
    />
  );
};
