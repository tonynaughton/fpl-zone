import React from "react";
import { Box, Typography } from "@mui/material";
import { getTeamCrestImageUrl } from "helpers";
import { isPlayer } from "types/base_item";

import { BaseItem } from "components/fdr/fdr";

interface BaseItemWithCrestProps {
  item: BaseItem;
  crestEnd?: boolean;
}

export const BaseItemWithCrest = ({ item, crestEnd = false }: BaseItemWithCrestProps): JSX.Element => {
  const name = isPlayer(item) ? item.web_name : item.name;
  const teamCode = isPlayer(item) ? item.team_code : item.code;

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection={crestEnd ? "row-reverse" : "row"}
      gap={1}
      justifyContent={crestEnd ? "right" : "left"}
      overflow='hidden'
      width='100%'
    >
      <img
        alt='team-crest'
        height={30}
        src={getTeamCrestImageUrl(teamCode)}
        width={30}
      />
      <Typography className='text-ellipsis' textAlign='left'>
        {name}
      </Typography>
    </Box>
  );
};
