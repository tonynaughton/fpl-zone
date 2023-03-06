import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getLocalImage, GetPlayerById } from "helpers";
import { isEmpty } from "lodash";
import { AppData, Fixture, StatValue } from "types";

export const STAT_IMAGE_NAMES = {
  goals_scored: "football",
  assists: "boot",
  yellow_cards: "yellow_card",
  red_cards: "red_card"
};

interface MatchStatProps {
  statName: string;
  selectedResult: Fixture;
}

interface StatColumnProps {
  stat: StatValue;
  name: string;
  isAway?: boolean;
}

const StatColumn = ({ stat, name, isAway = false }: StatColumnProps): JSX.Element => {
  const { players } = useContext(AppDataContext) as AppData;

  const player = GetPlayerById(stat.element, players);

  return (
    <Box
      display='flex'
      flexDirection={isAway ? "row" : "row-reverse"}
      justifyContent={isAway ? "right" : "left"}
      overflow='hidden'
    >
      <Typography className='text-ellipsis'>
        {player.web_name}
        {stat.value > 1 ? ` (${stat.value})` : ""}
      </Typography>
      &nbsp;&nbsp;
      <img
        alt={STAT_IMAGE_NAMES[name]}
        height={20}
        src={getLocalImage(`${STAT_IMAGE_NAMES[name]}.png`)}
      />
    </Box>
  );
};

export const MatchStat = ({ statName, selectedResult }: MatchStatProps): JSX.Element => {
  const { playerStats } = useContext(AppDataContext) as AppData;

  const stats = selectedResult.stats.find((stat) => stat.identifier === statName)!;
  const statTitle = playerStats.find((stat) => stat.name === statName)!;

  if (isEmpty(stats.h) && isEmpty(stats.a)) {
    return <></>;
  }

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      paddingTop={1.5}
      width='100%'
    >
      <Typography mb={1}>
        {statTitle.label.toUpperCase()}
      </Typography>
      <Box display='flex' width='100%'>
        <Box height='100%' width='50%'>
          {stats.h.map((stat, key) => <StatColumn key={key} name={statName} stat={stat} />)}
        </Box>
        <Box height='100%' width='50%'>
          {stats.a.map((stat, key) => (
            <StatColumn
              isAway
              key={key}
              name={statName}
              stat={stat}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
