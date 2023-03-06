import React, { useContext } from "react";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { AppDataContext } from "app_content";
import { getTeamById } from "helpers";
import { AppData, Fixture as FixtureType } from "types";
import { isPlayer } from "types/base_item";

import { BaseItem } from "./fdr";

interface FixtureProps {
  fixtures: FixtureType[];
  baseItem: BaseItem;
}

interface SingleFixtureProps {
  fixture: FixtureType;
}

export const Fixture = ({
  fixtures,
  baseItem
}: FixtureProps): JSX.Element => {
  const { teams, isMobile } = useContext(AppDataContext) as AppData;

  const SingleFixture = ({ fixture }: SingleFixtureProps): JSX.Element => {
    const theme = useTheme();

    const teamId = isPlayer(baseItem) ? baseItem.team : baseItem.id;
    const isHome = fixture.team_h === teamId;
    const oppositionId = isHome ? fixture.team_a : fixture.team_h;
    const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;
    const text = `${getTeamById(oppositionId, teams).short_name} (${isHome ? "H" : "A"})`;

    return (
      <Tooltip
        enterDelay={300}
        placement='top'
        title={isMobile ? "" : text}
      >
        <Box
          bgcolor={theme.palette.fdr[difficulty]}
          className='flex-center'
          data-testid={`fixture-container-bg-${fixture.id}`}
          flexBasis={1}
          flexGrow={1}
          height='100%'
          overflow='hidden'
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
      sx={{ "& div:nth-of-type(n+2)": { borderLeft: "0.5px solid black" } }}
      width='8rem'
    >
      {fixtures.map((fixture, key) => <SingleFixture fixture={fixture} key={key} />)}
    </Box>
  );
};
