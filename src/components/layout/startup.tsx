import React from "react";
import { Box, useTheme } from "@mui/material";
import { getLocalImage } from "helpers";

export const Startup = (props: { children: JSX.Element }): JSX.Element => {
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.primary.main}
      height='100vh'
      width='100%'
    >
      <Box
        className='flex-center'
        height='100%'
        margin='auto'
        width='50%'
      >
        <Box
          alignItems='center'
          display='flex'
          flexDirection='column'
          gap='5vh'
          height='50%'
          width='100%'
        >
          <img alt='fpl-zone-logo' src={getLocalImage(`logo.png`)} width='100%' />
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};
