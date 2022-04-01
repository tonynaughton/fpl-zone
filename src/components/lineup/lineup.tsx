import React from "react";
import { Box, Typography } from "@mui/material";
import { Player as PlayerType, TeamData, TeamPicks } from "types";
import Player from "../player/player";
import _ from "lodash";
import { numberWithCommas } from "helpers";

interface LineupProps {
  selected: PlayerType[][];
  bench: PlayerType[];
  teamPicks?: TeamPicks;
  teamData?: TeamData;
}

export default function Lineup({ selected, bench, teamPicks, teamData }: LineupProps): JSX.Element {
  const sortedBench = _.sortBy(bench, ["element_type"]);

  const renderInfo = (): JSX.Element => {
    const textStyling = {
      display: "block",
      fontSize: "18px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "50%",
      textAlign: "center",
    };
    return (
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {teamData && (
          <Typography sx={{ fontSize: "30px", textAlign: "center" }}>{teamData.name}</Typography>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 1,
            mt: 2,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {teamPicks && (
            <Typography sx={textStyling}>
              ACTIVE CHIP: {teamPicks.active_chip.toUpperCase()}
            </Typography>
          )}
          {teamData && (
            <Typography sx={textStyling}>GW POINTS: {teamData.summary_event_points}</Typography>
          )}
          {teamData && (
            <Typography sx={textStyling}>
              OVERALL RANK: {numberWithCommas(teamData.summary_overall_rank)}
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  const renderSelected = (): JSX.Element => {
    return (
      <Box
        data-testid="first-xi-players"
        sx={{
          p: 4,
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/pitch.png)`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: 40,
          height: "100%",
          rowSpacing: 2,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {selected.map((positionGroup, key) => {
          return (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              {positionGroup.map((player, key) => {
                return <Player player={player} key={key} />;
              })}
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderBench = (): JSX.Element => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", rowGap: 2 }}>
        <Typography fontSize={20}>Bench</Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
            rowSpacing: 2,
            pl: 10,
            pr: 10,
          }}
          data-testid="bench-players"
        >
          {sortedBench.map((player, key) => {
            return <Player player={player} key={key} />;
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ height: "100%", p: 3, display: "flex", flexDirection: "column" }}>
      {!!teamData && !!teamPicks && renderInfo()}
      {renderSelected()}
      {renderBench()}
    </Box>
  );
}
