import React from "react";
import { Add } from "@mui/icons-material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, IconButton, useTheme } from "@mui/material";
import { getPlayerImageUrl } from "helpers";
import { Player } from "types";

interface PlayerImageCellProps {
  player?: Player;
  onButtonClick: () => void;
}

export const PlayerImageCell = ({ player, onButtonClick }: PlayerImageCellProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      borderRadius={!player ? "50%" : "auto"}
      data-testid={`player-image-container-${player ? player.id : "placeholder"}`}
      height='18vh'
      margin='auto'
      position='relative'
      sx={{
        backgroundImage: `url(${(getPlayerImageUrl(player))})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        cursor: !player ? "pointer" : "auto"
      }}
      width='18vh'
    >
      <Box
        bgcolor={!player ? theme.palette.success.main : theme.palette.warning.main}
        borderRadius='50%'
        className='flex-center'
        data-testid='add-button'
        height='5vh'
        position='absolute'
        right={0}
        top={0}
        width='5vh'
      >
        <IconButton
          data-testid='remove-button'
          onClick={onButtonClick}
          size='small'
        >
          {!player ? <Add /> : <CloseRoundedIcon color='info' />}
        </IconButton>
      </Box>
    </Box>
  );
};
