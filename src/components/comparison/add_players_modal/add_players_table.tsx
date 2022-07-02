import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColumnHeaderParams, GridRenderCellParams, GridRowParams, GridSelectionModel } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { formatPrice, getLocalImage, GetPlayerById, getPositionById, getTeamById } from "helpers";
import { AppData, Player } from "types";
import { startCase } from "lodash";

interface AddPlayersTableProps {
  displayedPlayers: Player[];
  tempSelectedPlayers: Player[];
  setTempSelectedPlayers: (players: Player[]) => void;
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
        src={getLocalImage(`crests/${team.code}.png`)}
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
  <Typography>{props.value}</Typography>
);

const HeaderCell = (props: GridColumnHeaderParams<string, any>): JSX.Element => (
  <Typography>{startCase(props.field)}</Typography>
);

export const AddPlayersTable = ({
  displayedPlayers,
  // tempSelectedPlayers,
  // setTempSelectedPlayers
}: AddPlayersTableProps): JSX.Element => {
  const { positions, teams, players } = useContext(AppDataContext) as AppData;
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  const teamNameComparator = (playerA: Player, playerB: Player) => {
    const teamA = getTeamById(playerA.team, teams);
    const teamB = getTeamById(playerB.team, teams);

    return teamA.name.localeCompare(teamB.name);
  };

  const rows = displayedPlayers.map((player, index) => ({
    id: index,
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
  }

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
        pagination
        rows={rows}
        density='compact'
        pageSize={25}
        rowsPerPageOptions={[25]}
        disableColumnMenu
        sx={{
          '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
            outline: 'none',
          }
        }}
        isRowSelectable={isRowSelectable}
        initialState={{
          sorting: {
            sortModel: [{ field: 'points', sort: 'desc' }],
          }
        }}
        selectionModel={selectionModel}
        onSelectionModelChange={newSelectionModel => setSelectionModel(newSelectionModel)}
      />
    </Box>
  );
};
