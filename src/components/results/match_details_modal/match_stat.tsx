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
  const statValue = `${player.web_name} ${stat.value > 1 ? ` (${stat.value})` : ""}`;

  return (
    <Box
      display='flex'
      flexDirection={isAway ? "row" : "row-reverse"}
      gap={1}
      justifyContent={isAway ? "right" : "left"}
    >
      <Typography className='text-ellipsis'>{statValue}</Typography>
      <img
        alt={STAT_IMAGE_NAMES[name]}
        height={20}
        src={getLocalImage(`misc/${STAT_IMAGE_NAMES[name]}.png`)}
      />
    </Box>
  );
};

export const MatchStat = ({ statName, selectedResult }: MatchStatProps): JSX.Element => {
  const { playerStats } = useContext(AppDataContext) as AppData;

  const { h: homeStats, a: awayStats } = selectedResult.stats.find((stat) => stat.identifier === statName)!;

  if (isEmpty(homeStats) && isEmpty(awayStats)) {
    return <></>;
  }

  const { label } = playerStats.find((stat) => stat.name === statName)!;

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      gap={2}
      width='100%'
    >
      <Box className='flex-center' width='100%'>
        <Typography>{label.toUpperCase()}</Typography>
      </Box>
      <Box display='flex' width='100%'>
        <Box flex={1}>
          {homeStats.map((stat, key) => <StatColumn key={key} name={statName} stat={stat} />)}
        </Box>
        <Box flex={1}>
          {awayStats.map((stat, key) => (
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
