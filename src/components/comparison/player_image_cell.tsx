import React from "react";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { getPlayerImageUrl } from "helpers";
import { Player } from "types";

interface PlayerImageCellProps {
  player?: Player;
  onButtonClick: () => void;
}

export const PlayerImageCell = ({ player, onButtonClick }: PlayerImageCellProps): JSX.Element => {
  const iconStyle = {
    position: "absolute",
    ...player
      ? {
        cursor: "pointer",
        right: 10,
        top: 10
      }
      : {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: "modal"
      }
  };

  return (
    <Box>
      <IconButton
        color={player ? "warning" : "success"}
        data-testid='action-button'
        onClick={onButtonClick}
        sx={iconStyle}
      >
        {player
          ? <RemoveCircle data-testid='remove-icon' />
          : <AddCircle data-testid='add-icon' />}
      </IconButton>
      <Box
        className='flex-center'
        data-testid={`player-image-container-${player?.id || "placeholder"}`}
        height='15vh'
        margin='auto'
        onClick={onButtonClick}
      >
        <img
          alt={player ? `${player!.web_name} image` : "add player button"}
          height='100%'
          src={getPlayerImageUrl(player)}
          width='auto'
        />
      </Box>
    </Box>
  );
};
