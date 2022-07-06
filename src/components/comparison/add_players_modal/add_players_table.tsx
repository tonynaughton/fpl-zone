import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColumnHeaderParams, GridRenderCellParams, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { formatPrice, getPositionById, getTeamById, getTeamCrestImageUrl } from "helpers";
import { startCase } from "lodash";
import { AppData, Player } from "types";

interface AddPlayersTableProps {
  displayedPlayers: Player[];
  selectionModel: GridRowId[];
  setSelectionModel: (ids: GridRowId[]) => void;
}

const TeamCell = (props: GridRenderCellParams<Player>): JSX.Element => {
  const { teams } = useContext(AppDataContext) as AppData;
  const { value: player } = props;

  if (!player) return <></>;

  const team = getTeamById(player.team, teams);

  return (
    <Box alignItems='center' display='flex' gap={1}>
      <img
        alt='team-crest'
        data-testid={`player-team-crest-${player.id}`}
        height='25vh'
        src={getTeamCrestImageUrl(player.team_code)}
        width='auto'
      />
      <Typography
        data-testid={`player-team-name-${player.id}`}
        display='inline'
      >
        {team.name}
      </Typography>
    </Box>
  );
};

const StandardCell = (props: GridRenderCellParams<string>): JSX.Element => (
  <Typography className='text-ellipsis'>{props.value}</Typography>
);

const HeaderCell = (props: GridColumnHeaderParams<string, any>): JSX.Element => (
  <Typography className='text-ellipsis'>{startCase(props.field)}</Typography>
);

export const AddPlayersTable = ({
  displayedPlayers,
  selectionModel,
  setSelectionModel
}: AddPlayersTableProps): JSX.Element => {
  const { positions, teams } = useContext(AppDataContext) as AppData;

  const teamNameComparator = (playerA: Player, playerB: Player) => {
    const teamA = getTeamById(playerA.team, teams);
    const teamB = getTeamById(playerB.team, teams);

    return teamA.name.localeCompare(teamB.name);
  };

  const rows = displayedPlayers.map((player) => ({
    id: player.id,
    name: `${player.first_name} ${player.second_name}`,
    team: player,
    position: getPositionById(player.element_type, positions).singular_name_short,
    price: formatPrice(player.now_cost),
    points: player.total_points
  }));

  const isRowSelectable = (params: GridRowParams) => {
    if (selectionModel.length < 5 || selectionModel.includes(params.id)) {
      return true;
    }

    return false;
  };

  return (
    <Box height='100%' width='100%'>
      <DataGrid
        autoHeight
        checkboxSelection
        columns={[
          { field: "name", headerName: "Name", flex: 1, renderHeader: HeaderCell, renderCell: StandardCell },
          { field: "team", headerName: "Team", flex: 1, renderHeader: HeaderCell, renderCell: TeamCell, sortComparator: teamNameComparator },
          { field: "position", headerName: "Position", flex: 0.5, renderHeader: HeaderCell, renderCell: StandardCell },
          { field: "price", headerName: "Price", flex: 0.5, renderHeader: HeaderCell, renderCell: StandardCell },
          { field: "points", headerName: "Total Points", flex: 0.5, renderHeader: HeaderCell, renderCell: StandardCell }
        ]}
        density='compact'
        disableColumnMenu
        initialState={{
          sorting: {
            sortModel: [{ field: "points", sort: "desc" }]
          }
        }}
        isRowSelectable={isRowSelectable}
        onSelectionModelChange={newSelectionModel => setSelectionModel(newSelectionModel)}
        pageSize={25}
        pagination
        rows={rows}
        rowsPerPageOptions={[25]}
        selectionModel={selectionModel}
        sx={{
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within": {
            outline: "none"
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
            outline: "none"
          }
        }}
      />
    </Box>
  );
};
