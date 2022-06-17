import React from "react";
import { Box, TableCell, Tooltip, Typography } from "@mui/material";
import { useTeamById } from "hooks";
import { Fixture as FixtureType, Player, Team } from "types";

import { fdrColours } from "./difficulty_legend";
import { BaseItem } from "./fdr";

interface FixtureProps {
  fixtures: FixtureType[];
  baseItem: BaseItem;
  isPlayerTable: boolean;
}

export const Fixture = ({
  fixtures,
  baseItem,
  isPlayerTable
}: FixtureProps): JSX.Element => {
  const RenderFixture = (fixture: FixtureType, key: number): JSX.Element => {
    const teamId = isPlayerTable ? (baseItem as Player).team : (baseItem as Team).id;
    const isHome = fixture.team_h === teamId;
    const oppositionId = isHome ? fixture.team_a : fixture.team_h;
    const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;
    const text = `${useTeamById(oppositionId).short_name} (${isHome ? "H" : "A"})`;

    return (
      <Tooltip
        arrow
        enterDelay={500}
        key={key}
        placement='top'
        title={text}
      >
        <Box
          data-testid={`fixture-container-bg-${fixture.id}`}
          key={key}
          sx={{
            p: 0.5,
            display: "flex",
            backgroundColor: `${fdrColours[difficulty]}`,
            height: "100%",
            flexGrow: 1,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            flexBasis: 1
          }}
        >
          <Box
            sx={{
              p: 0.2,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}
          >
            <Typography sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              {text}
            </Typography>
          </Box>
        </Box>
      </Tooltip>
    );
  };

  return (
    <TableCell scope='row'>
      <Box
        data-testid='fixture-container'
        sx={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        {fixtures.map((fixture, key) => RenderFixture(fixture, key))}
      </Box>
    </TableCell>
  );
};
