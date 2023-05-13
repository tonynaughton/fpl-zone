import React from "react";
import { RemoveCircle } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { getPlayerImageUrl } from "helpers";
import { Player } from "types";

interface PlayerImageCellProps {
  player: Player;
  onButtonClick: () => void;
}

export const PlayerImageCell = ({ player, onButtonClick }: PlayerImageCellProps): JSX.Element => {
  const iconStyle = {
    position: "absolute",
    cursor: "pointer",
    right: 10,
    top: 10
  };

  const RemoveButton = (): JSX.Element => (
    <IconButton
      color='warning'
      data-testid='action-button'
      onClick={onButtonClick}
      sx={iconStyle}
    >
      <RemoveCircle data-testid='remove-icon' />
    </IconButton>
  );

  return (
    <Box height='inherit'>
      <RemoveButton />
      <Box
        className='flex-center'
        data-testid={`player-image-container-${player.id}`}
        height='100%'
        onClick={onButtonClick}
      >
        <img
          alt={`${player!.web_name} portrait`}
          height='100%'
          src={getPlayerImageUrl(player)}
        />
      </Box>
    </Box>
  );
};
