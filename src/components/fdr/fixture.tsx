import React, { useContext } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { AppData, Fixture as FixtureType, Player, Team } from "types";

import { BaseItem, FDR_COLOURS } from "./fdr";

interface FixtureProps {
  fixtures: FixtureType[];
  baseItem: BaseItem;
  isPlayerTable: boolean;
}

interface SingleFixtureProps {
  fixture: FixtureType;
}

export const Fixture = ({
  fixtures,
  baseItem,
  isPlayerTable
}: FixtureProps): JSX.Element => {
  const SingleFixture = ({ fixture }: SingleFixtureProps): JSX.Element => {
    const { teams } = useContext(AppDataContext) as AppData;

    const teamId = isPlayerTable ? (baseItem as Player).team : (baseItem as Team).id;
    const isHome = fixture.team_h === teamId;
    const oppositionId = isHome ? fixture.team_a : fixture.team_h;
    const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;
    const text = `${getTeamById(oppositionId, teams).short_name} (${isHome ? "H" : "A"})`;

    return (
      <Tooltip
        enterDelay={300}
        placement='top'
        title={text}
      >
        <Box
          className='flex-center'
          data-testid={`fixture-container-bg-${fixture.id}`}
          flexBasis={1}
          flexGrow={1}
          height='100%'
          overflow='hidden'
          sx={{ backgroundColor: `${FDR_COLOURS[difficulty]}` }}
        >
          <Box overflow='hidden' padding={0.5}>
            <Typography className='text-ellipsis'>{text}</Typography>
          </Box>
        </Box>
      </Tooltip>
    );
  };

  return (
    <Box
      alignItems='center'
      data-testid='fixture-container'
      display='flex'
      height='100%'
      justifyContent='space-evenly'
    >
      {fixtures.map((fixture, key) => <SingleFixture fixture={fixture} key={key} />)}
    </Box>
  );
};
