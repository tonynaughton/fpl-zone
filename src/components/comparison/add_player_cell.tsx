import React from "react";
import { PersonAddAlt1 } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { Player } from "types";

interface PlayerImageCellProps {
  player?: Player;
  onButtonClick: () => void;
}

export const AddPlayerCell = ({ onButtonClick }: PlayerImageCellProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      borderRadius='50%'
      className='flex-center'
      flexDirection='column'
      fontSize='2.5rem'
      height='7rem'
      margin='auto'
      onClick={onButtonClick}
      pb={1}
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        cursor: "pointer",
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        "&:hover": {
          backgroundColor: theme.palette.secondary.dark
        }
      }}
      width='7rem'
    >
      <PersonAddAlt1 data-testid='add-icon' fontSize='inherit' sx={{ p: 0 }} />
      <Typography textTransform='uppercase'>Add Player</Typography>
    </Box>
  );
};
