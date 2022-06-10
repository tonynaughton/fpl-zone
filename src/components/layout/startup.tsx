import React from "react";
import { Box } from "@mui/material";

export const Startup = (props: { children: JSX.Element }): JSX.Element => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#16B7EA"
      }}
    >
      <Box
        alignItems='center'
        display='flex'
        height='100%'
        justifyContent='center'
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
          <img alt='fpl-zone-logo' src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} width='100%' />
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};
