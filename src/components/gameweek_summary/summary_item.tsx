import React from "react";
import { Box, Typography } from "@mui/material";

import { SummaryItemType } from "./types";

interface SummaryItemProps {
  item: SummaryItemType;
}

export const SummaryItem = ({ item }: SummaryItemProps): JSX.Element => {
  const img: JSX.Element | null = item.teamCode
    ? (
      <img
        alt={`${item.label}-crest-img`}
        height='auto'
        src={`${process.env.PUBLIC_URL}/assets/images/crests/${item.teamCode}.png`}
        width='15%'
      />
    )
    : null;

  const itemValue = `
    ${item.playerName || ""}
    ${item.playerName && item.statValue ? " - " : ""}
    ${item.statValue || ""}
  `;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: 1
      }}
    >
      <Typography
        data-testid={`${item.label}-label`}
        sx={{
          width: "100%",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textAlign: "center"
        }}
        variant='h3'
      >
        {item.label.toUpperCase()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: 1,
          maxWidth: "100%"
        }}
      >
        {img}
        <Typography
          data-testid={`${item.label}-player-name`}
          sx={{
            textOverflow: "ellipsis",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden"
          }}
        >
          {itemValue}
        </Typography>
      </Box>
    </Box>
  );
};
