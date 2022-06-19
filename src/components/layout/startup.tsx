import React from "react";
import { Box } from "@mui/material";
import { getLocalImage } from "helpers";

export const Startup = (props: { children: JSX.Element }): JSX.Element => {
  return (
    <Box
      height='100vh'
      sx={{ backgroundColor: "#16B7EA" }}
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
