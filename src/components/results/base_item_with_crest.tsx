import React from "react";
import { Box, Typography } from "@mui/material";
import { getTeamCrestImageUrl } from "helpers";
import { isPlayer } from "types/base_item";

import { BaseItem } from "components/fdr/fdr";

interface BaseItemWithCrestProps {
  item: BaseItem;
  crestEnd?: boolean;
  abbreviateTeam?: boolean;
  crestOnly?: boolean;
}

export const BaseItemWithCrest = ({
  item,
  crestEnd = false,
  abbreviateTeam = false,
  crestOnly = false
}: BaseItemWithCrestProps): JSX.Element => {
  const name = isPlayer(item) ? item.web_name : abbreviateTeam ? item.short_name : item.name;
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
        data-testid={`base-item-crest-img-${item.id}`}
        height={30}
        src={getTeamCrestImageUrl(teamCode)}
        width={30}
      />
      {!crestOnly &&
        <Typography className='text-ellipsis' data-testid={`base-item-text-${item.id}`} textAlign='left'>
          {name}
        </Typography>}
    </Box>
  );
};
