import React, { useContext } from "react";
import { Box, Grid,Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { getLocalImage, GetPlayerById } from "helpers";
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

const StatColumn = (stat: StatValue, key: number, name: string, isAway = false): JSX.Element => {
  const { players } = useContext(AppDataContext) as AppData;

  const player = GetPlayerById(stat.element, players);

  return (
    <Box
      display='flex'
      flexDirection={isAway ? "row" : "row-reverse"}
      justifyContent={isAway ? "right" : "left"}
      key={key}
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

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const stats = selectedResult.stats.find((stat) => stat.identifier === statName)!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const statTitle = playerStats.find((stat) => stat.name === statName)!;
  const statsExist = stats.h.length > 0 || stats.a.length > 0;

  return statsExist
    ? (
      <Box
        alignItems='center'
        display='flex'
        flexDirection='column'
        paddingTop={1.5}
        width='100%'
      >
        <Typography component='h4' paddingBottom={1} variant='h5'>
          {statTitle.label.toUpperCase()}
        </Typography>
        <Grid columnSpacing={2} container>
          <Grid item xs={6}>
            {stats.h.map((stat, key) => StatColumn(stat, key, statName))}
          </Grid>
          <Grid item xs={6}>
            {stats.a.map((stat, key) => StatColumn(stat, key, statName, true))}
          </Grid>
        </Grid>
      </Box>
    )
    : (
      <></>
    );
};
