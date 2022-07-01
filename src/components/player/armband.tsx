import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface ArmbandProps {
  isVice?: boolean;
}

export const Armband = ({ isVice = false }: ArmbandProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.info.main}
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
