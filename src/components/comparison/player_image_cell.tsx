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
    borderRadius={!player ? "50%" : "auto"}
    data-testid={`player-image-container-${player ? player.id : "placeholder"}`}
    height='18vh'
    margin='auto'
    onClick={!player ? onAddPlayerClick : undefined}
    position='relative'
    sx={{
      backgroundImage: `url(${(getPlayerImageUrl(player))})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      cursor: !player ? "pointer" : "auto"
    }}
    width='18vh'
  >
    <Box position='absolute' right={0} top={0}>
      {!player
        ? (
          <AddButton />
        )
        : (
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
        )}
    </Box>
  </Box>
);
