import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { DataGrid, GridColDef, GridColumnHeaderParams, GridRenderCellParams, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { formatPrice } from "helpers";
import { AppData } from "types";

import { Notifier, NotifierType } from "components/layout";

import { usePositionColumn } from "./column_hooks/use_position_column";
import { useTeamColumn } from "./column_hooks/use_team_column";
import { CustomPagination } from "./pagination";

interface AddPlayersTableProps {
  selectionModel: GridRowId[];
  searchInput: string;
  setSelectionModel: (ids: GridRowId[]) => void;
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
  searchInput
}: AddPlayersTableProps): JSX.Element => {
  const { players } = useContext(AppDataContext) as AppData;

  const rows = players.map((player) => ({
    id: player.id,
    name: `${player.first_name} ${player.second_name}`,
    team: player,
    position: player,
    price: formatPrice(player.now_cost),
    points: player.total_points
  }));

  const isRowSelectable = (params: GridRowParams): boolean => (
    selectionModel.length < 5 || selectionModel.includes(params.id)
  );

  const posCol = usePositionColumn();
  const teamCol = useTeamColumn();

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, renderHeader, renderCell },
    teamCol,
    posCol,
    { field: "price", headerName: "Price", flex: 0.5, renderHeader, renderCell },
    { field: "points", headerName: "Total Points", flex: 0.5, renderHeader, renderCell }
  ];

  const filterModel = {
    items: [{ columnField: "name", operatorValue: "contains", value: searchInput }]
  };


  return (
    <DataGrid
      checkboxSelection
      columns={columns}
      components={{
        NoRowsOverlay: () => <Notifier message='No players found..' type={NotifierType.Warning} />,
        Pagination: CustomPagination
      }}
      density='compact'
      disableColumnFilter
      disableColumnMenu
      filterModel={filterModel}
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
      rowsPerPageOptions={[25, 50, 100]}
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
        },
        "& .MuiDataGrid-selectedRowCount": {
          fontSize: "1rem",
          color: selectionModel.length === 5 ? "red" : "inherit"
        }
      }}
    />
  );
};
