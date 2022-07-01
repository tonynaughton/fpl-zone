import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { formatPrice, getLocalImage, getPositionById, getTeamById } from "helpers";
import { AppData, Player } from "types";

interface AddPlayersTableProps {
  displayedPlayers: Player[];
}

const RenderTeam = (props: GridRenderCellParams<Player>): JSX.Element => {
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

export const AddPlayersTable = ({
  displayedPlayers
}: AddPlayersTableProps): JSX.Element => {
  const { positions } = useContext(AppDataContext) as AppData;

  const rows = displayedPlayers.map((player, index) => ({
    id: index,
    name: `${player.first_name} ${player.second_name}`,
    team: player,
    position: getPositionById(player.element_type, positions).singular_name_short,
    price: formatPrice(player.now_cost)
  }));

  return (
    <Box height='100%' width='100%'>
      <DataGrid
        autoHeight
        checkboxSelection
        columns={[
          { field: "name", headerName: "Name", flex: 1 },
          {
            field: "team",
            headerName: "Team",
            flex: 1,
            renderCell: RenderTeam
          },
          { field: "position", headerName: "Position", flex: 0.5 },
          { field: "price", headerName: "Price", flex: 0.5 }
        ]}
        pagination
        rows={rows}
      />
    </Box>
  );
};
