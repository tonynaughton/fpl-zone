import React from "react";
import { Box } from "@mui/material";

interface ArmbandProps {
  isVice?: boolean;
}

export const Armband = ({ isVice = false }: ArmbandProps): JSX.Element => {
  return (
    <Box
      border='1px solid black'
      borderRadius='50%'
      className='flex-center'
      data-testid='armband-container'
      height='1.5vw'
      left={0}
      position='absolute'
      sx={{ backgroundColor: "white" }}
      top={0}
      width='1.5vw'
    >
      {isVice ? "V" : "C"}
    </Box>
  );
};
