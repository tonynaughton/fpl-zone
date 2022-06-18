import React from "react";
import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { getPlayerImageUrl } from "helpers";
import { Player } from "types";

import { AddButton } from "components/utils";

interface PlayerImageCellProps {
  player?: Player;
  onAddPlayerClick?: () => void;
  onRemovePlayerClick?: (player: Player) => void;
}

export const PlayerImageCell = ({ player, onAddPlayerClick, onRemovePlayerClick }: PlayerImageCellProps): JSX.Element => (
  <Box
    data-testid={`player-image-container-${player ? player.id : "placeholder"}`}
    onClick={!player ? onAddPlayerClick : undefined}
    sx={{
      height: "18vh",
      width: "18vh",
      margin: "auto",
      backgroundImage: `url(${(getPlayerImageUrl(player))})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: !player ? "pointer" : "auto",
      borderRadius: !player ? "50%" : "auto",
      position: "relative"
    }}
  >
    { !player
      ? (
        <AddButton />
      )
      : (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0
          }}
        >
          <IconButton
            data-testid='remove-button'
            onClick={onRemovePlayerClick ? (): void => onRemovePlayerClick(player) : undefined}
            size='small'
            sx={{
              backgroundColor: "#c30000",
              "&:hover": {
                backgroundColor: "#e00d0d"
              }
            }}
          >
            <Close color='info' />
          </IconButton>
        </Box>
      )}
  </Box>
);
