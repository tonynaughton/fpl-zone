import React from "react";
import { Box, Typography } from "@mui/material";

interface ArmbandProps {
  isVice?: boolean;
}

export const Armband = ({ isVice = false }: ArmbandProps): JSX.Element => {
  return (
    <Box
      bgcolor='rgb(240, 240, 240, 1)'
      border='1px solid black'
      borderRadius='50%'
      className='flex-center'
      data-testid='armband-container'
      height='1.8vw'
      left={0}
      position='absolute'
      top={0}
      width='1.8vw'
    >
      <Typography>{isVice ? "V" : "C"}</Typography>
    </Box>
  );
};
