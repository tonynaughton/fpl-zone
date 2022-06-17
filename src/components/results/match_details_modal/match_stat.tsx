import React, { useContext } from "react";
import { Box, Grid,Typography } from "@mui/material";
import { AppDataContext } from "app_content";
import { usePlayerById } from "hooks";
import { AppData, Fixture, StatValue } from "types";

export const STAT_IMAGE_NAMES = {
  GOALS_SCORED: "football",
  ASSISTS: "boot",
  YELLOW_CARDS: "yellow_card",
  RED_CARDS: "red_card"
};

interface MatchStatProps {
  statName: string;
  selectedResult: Fixture;
}

const StatColumn = (stat: StatValue, key: number, isAway = false): JSX.Element => {
  const player = usePlayerById(stat.element);
  const statName = stat.value;

  return (
    <Box
      display='flex'
      flexDirection={isAway ? "row" : "row-reverse"}
      justifyContent={isAway ? "right" : "left"}
      key={key}
      sx={{ whiteSpace: "nowrap", textOverflow: "hidden" }}
    >
      <Typography
        sx={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          display: "block"
        }}
      >
        {player.web_name}
        {stat.value > 1 ? ` (${stat.value})` : ""}
      </Typography>
      &nbsp;&nbsp;
      <img
        alt={STAT_IMAGE_NAMES[statName]}
        height={20}
        src={`${process.env.PUBLIC_URL}/assets/images/${STAT_IMAGE_NAMES[statName]}.png`}
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
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          pt: 1.5
        }}
      >
        <Typography component='h4' sx={{ pb: 1 }} variant='h5'>
          {statTitle.label.toUpperCase()}
        </Typography>
        <Grid columnSpacing={2} container>
          <Grid item xs={6}>
            {stats.h.map((stat, key) => StatColumn(stat, key))}
          </Grid>
          <Grid item xs={6}>
            {stats.a.map((stat, key) => StatColumn(stat, key, true))}
          </Grid>
        </Grid>
      </Box>
    )
    : (
      <></>
    );
};
