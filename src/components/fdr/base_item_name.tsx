import React from "react";
import { Box, Typography } from "@mui/material";
import { getTeamCrestImageUrl } from "helpers";
import { has } from "lodash";
import { Player, Team } from "types";

import { BaseItem } from "./fdr";

interface BaseItemNameProps {
  baseItem: BaseItem;
}

export const BaseItemName = ({ baseItem }: BaseItemNameProps): JSX.Element => {
  const isPlayerTable = has(baseItem, "web_name");

  const name = isPlayerTable ? (baseItem as Player).web_name : (baseItem as Team).name;
  const teamCode = isPlayerTable ? (baseItem as Player).team_code : (baseItem as Team).code;

  return (
    <Box
      alignItems='center'
      data-testid={`base-item-${baseItem.id}`}
      display='flex'
      gap={1}
      paddingLeft={1}
      whiteSpace='nowrap'
    >
      <img
        alt={`${teamCode}-crest`}
        data-testid={`base-item-crest-img-${baseItem.id}`}
        height='22px'
        src={getTeamCrestImageUrl(teamCode)}
      />
      <Box overflow='hidden'>
        <Typography
          className='text-ellipsis'
          data-testid={`base-item-text-${baseItem.id}`}
          fontWeight={500}
          variant='body1'
        >
          {name.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};
