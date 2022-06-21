import React from "react";
import { Box, Typography } from "@mui/material";
import { getLocalImage } from "helpers";
import { has } from "lodash";
import { Player, Team } from "types";

import { BaseItem } from "./fdr";

interface BaseItemNameProps {
  baseItem: BaseItem;
}

export const BaseItemName = ({ baseItem }: BaseItemNameProps): JSX.Element => {
  const isPlayerTable = has(baseItem, "web_name");

  const name = isPlayerTable ? (baseItem as Player).web_name : (baseItem as Team).name;
  const teamId = isPlayerTable ? (baseItem as Player).team_code : (baseItem as Team).code;

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
        alt='crest-img'
        data-testid={`base-item-crest-img-${baseItem.id}`}
        height='22px'
        src={getLocalImage(`crests/${teamId}.png`)}
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
