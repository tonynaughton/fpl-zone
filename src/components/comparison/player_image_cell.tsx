import React from "react";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Box, Icon } from "@mui/material";
import { getPlayerImageUrl } from "helpers";
import { Player } from "types";

interface PlayerImageCellProps {
  player?: Player;
  onButtonClick: () => void;
}

export const PlayerImageCell = ({ player, onButtonClick }: PlayerImageCellProps): JSX.Element => (
  <Box
    borderRadius={!player ? "50%" : "auto"}
    data-testid={`player-image-container-${player ? player.id : "placeholder"}`}
    height='18vh'
    margin='auto'
    onClick={!player ? onButtonClick : undefined}
    position='relative'
    sx={{
      backgroundImage: `url(${(getPlayerImageUrl(player))})`,
      backgroundSize: "cover",
      cursor: !player ? "pointer" : "auto"
    }}
    width='18vh'
  >
    <Icon
      color={!player ? "success" : "warning"}
      data-testid='action-button'
      fontSize='inherit'
      onClick={onButtonClick}
      sx={{
        position: "absolute",
        cursor: "pointer",
        left: !player ? 0 : "auto",
        right: 0,
        top: 0,
        bottom: !player ? 0 : "auto",
        margin: "auto",
        fontSize: "2.5vw",
        borderRadius: "50%"
      }}
    >
      {!player
        ? <AddCircle data-testid='add-icon' fontSize='inherit' />
        : <RemoveCircle data-testid='remove-icon' fontSize='inherit' />}
    </Icon>
  </Box>
);
