import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AppDataContext } from "app_content";
import { getTeamById, getTeamCrestImageUrl } from "helpers";
import { AppData,Player } from "types";

import { renderHeader } from "../add_players_table";

export const useTeamColumn = (): GridColDef => {
  const { teams } = useContext(AppDataContext) as AppData;

  const sortComparator = (p1: Player, p2: Player): number => (
    getTeamById(p1.team, teams).name.localeCompare(getTeamById(p2.team, teams).name)
  );

  const renderCell = (props: GridRenderCellParams<Player>): JSX.Element => {
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

  return {
    field: "team",
    headerName: "Team",
    flex: 0.5,
    renderCell,
    renderHeader,
    sortComparator
  };
};
